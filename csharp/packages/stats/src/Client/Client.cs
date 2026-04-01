using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Codeserk.ForgeStats
{
    /// <summary>Client for sending analytics events to the Forge Stats API.</summary>
    public class Client
    {
        private const string KeySeparator = "___";
        private const string EventsPath = "/v1/events";
        private const string SignatureApp = "public";

        private static readonly JsonSerializerSettings JsonSettings = new JsonSerializerSettings
        {
            NullValueHandling = NullValueHandling.Ignore,
        };

        private readonly string _baseUrl;
        private readonly string _token;
        private readonly string _signatureSecret;
        private readonly Action<string, Exception> _onError;
        private readonly HttpClient _httpClient;
        private EventMeta _defaultMeta = new EventMeta();

        /// <summary>Initializes a new instance of the <see cref="Client"/> class.</summary>
        public Client(ClientOptions options, HttpClient? httpClient = null)
        {
            _baseUrl = options.BaseUrl;
            _onError = options.OnError ?? ((msg, ex) => { });
            _httpClient = httpClient ?? new HttpClient();

            var keyBytes = Convert.FromBase64String(options.Sdk);
            var key = Encoding.UTF8.GetString(keyBytes);
            var parts = key.Split(new[] { KeySeparator }, StringSplitOptions.None);
            _token = parts[0];
            _signatureSecret = parts[1];
        }

        /// <summary>Replaces the default metadata merged into every request.</summary>
        public void SetMeta(EventMeta meta)
        {
            _defaultMeta = meta;
        }

        /// <summary>Merges new metadata into the existing defaults.</summary>
        public void UpdateMeta(EventMeta meta)
        {
            _defaultMeta = _defaultMeta.MergeWith(meta);
        }

        /// <summary>Sends a single event to the API.</summary>
        public Task SendEvent(EventContent content, EventMeta? meta = null)
        {
            return SendEvents(new SendEventParams { Content = new[] { content }, Meta = meta });
        }

        /// <summary>Sends multiple events to the API.</summary>
        public async Task SendEvents(SendEventParams eventParams)
        {
            var merged = _defaultMeta.MergeWith(eventParams.Meta);
            var body = SerializeBody(eventParams.Content, merged);
            var headers = BuildHeaders(EventsPath, body);

            var request = new HttpRequestMessage(HttpMethod.Post, _baseUrl + EventsPath);
            request.Content = new StringContent(body, Encoding.UTF8, "application/json");
            foreach (var header in headers)
            {
                request.Headers.TryAddWithoutValidation(header.Key, header.Value);
            }

            var response = await _httpClient.SendAsync(request).ConfigureAwait(false);
            response.EnsureSuccessStatusCode();
        }

        /// <summary>Fire-and-forget single event. Calls OnError instead of throwing.</summary>
        public void Track(EventContent content, EventMeta? meta = null)
        {
            TrackMany(new SendEventParams { Content = new[] { content }, Meta = meta });
        }

        /// <summary>Sends an error event to the API.</summary>
        public Task SendError(Exception error, bool handled = true, EventMeta? meta = null)
        {
            return SendEvent(BuildErrorContent(error, handled), meta);
        }

        /// <summary>Fire-and-forget error tracking. Calls OnError instead of throwing.</summary>
        public void TrackError(Exception error, bool handled = true, EventMeta? meta = null)
        {
            Track(BuildErrorContent(error, handled), meta);
        }

        /// <summary>Fire-and-forget multiple events. Calls OnError instead of throwing.</summary>
        public void TrackMany(SendEventParams eventParams)
        {
            SendEvents(eventParams).ContinueWith(task =>
            {
                if (task.IsFaulted && task.Exception != null)
                {
                    _onError("[forge-stats] Failed to send event", task.Exception.GetBaseException());
                }
            });
        }

        private static string SerializeBody(EventContent[] content, EventMeta meta)
        {
            var body = new
            {
                meta.Timestamp,
                meta.TimestampEnd,
                userID = meta.UserId,
                meta.UserIp,
                meta.UserAgent,
                meta.UserType,
                meta.UserData,
                meta.UserCountry,
                meta.UserRegion,
                meta.UserCity,
                meta.DeviceType,
                meta.DeviceOS,
                meta.DeviceOSVersion,
                meta.DeviceBrowser,
                meta.AppName,
                meta.AppVersionName,
                meta.AppVersionID,
                meta.Referrer,
                meta.ReferrerEvent,
                meta.ReferrerUtmMedium,
                meta.ReferrerUtmSource,
                meta.ReferrerUtmCampaign,
                meta.ReferrerUtmContent,
                meta.ReferrerUtmTerm,
                content,
            };
            return JsonConvert.SerializeObject(body, JsonSettings);
        }

        private static EventContent BuildErrorContent(Exception error, bool handled)
        {
            var name = error.Message ?? error.GetType().Name ?? "Error";
            if (name.Length > 15)
            {
                name = name.Substring(0, 15);
            }

            var fingerprint = GenerateFingerprint(error);

            return new EventContent
            {
                Type = "Error",
                Name = name,
                Bucket = fingerprint,
                Data = new Dictionary<string, object>
                {
                    ["message"] = error.Message ?? string.Empty,
                    ["errorType"] = error.GetType().Name ?? "Error",
                    ["stack"] = error.StackTrace ?? string.Empty,
                    ["fingerprint"] = fingerprint,
                    ["handled"] = handled,
                },
            };
        }

        private static string GenerateFingerprint(Exception error)
        {
            var input = $"{error.GetType().FullName}:{error.Message}";
            using (var sha = SHA256.Create())
            {
                var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(input));
                return BitConverter.ToString(hash).Replace("-", string.Empty).Substring(0, 16).ToLowerInvariant();
            }
        }

        private Dictionary<string, string> BuildHeaders(string path, string body)
        {
            var signature = new SignatureBuilder(_signatureSecret)
                .WithUrl(path)
                .WithBody(body)
                .Build();

            return new Dictionary<string, string>
            {
                ["x-token"] = _token,
                ["x-signature-app"] = SignatureApp,
                ["x-signature"] = signature,
            };
        }
    }
}
