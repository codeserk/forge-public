using System;
using System.Collections.Generic;
using System.Net.Http;
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

        /// <summary>Sends a single event to the API.</summary>
        public Task SendEvent(EventContent content, EventMeta? meta = null)
        {
            return SendEvents(new SendEventParams { Content = new[] { content }, Meta = meta });
        }

        /// <summary>Sends multiple events to the API.</summary>
        public async Task SendEvents(SendEventParams eventParams)
        {
            var body = SerializeBody(eventParams);
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

        private static string SerializeBody(SendEventParams eventParams)
        {
            var body = new
            {
                referrer = eventParams.Meta?.Referrer,
                userAgent = eventParams.Meta?.UserAgent,
                Content = eventParams.Content,
            };
            return JsonConvert.SerializeObject(body, JsonSettings);
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
