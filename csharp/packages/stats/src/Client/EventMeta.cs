using System.Collections.Generic;
using Newtonsoft.Json;

namespace Codeserk.ForgeStats
{
    /// <summary>Request-level metadata attached alongside event content.</summary>
    public class EventMeta
    {
        /// <summary>Gets or sets the ISO 8601 timestamp. Defaults to now on the server.</summary>
        [JsonProperty("timestamp", NullValueHandling = NullValueHandling.Ignore)]
        public string? Timestamp { get; set; }

        /// <summary>Gets or sets the ISO 8601 end timestamp for duration events.</summary>
        [JsonProperty("timestampEnd", NullValueHandling = NullValueHandling.Ignore)]
        public string? TimestampEnd { get; set; }

        /// <summary>Gets or sets the application-level user identifier.</summary>
        [JsonProperty("userID", NullValueHandling = NullValueHandling.Ignore)]
        public string? UserId { get; set; }

        /// <summary>Gets or sets the client IP override.</summary>
        [JsonProperty("userIp", NullValueHandling = NullValueHandling.Ignore)]
        public string? UserIp { get; set; }

        /// <summary>Gets or sets the user agent string.</summary>
        [JsonProperty("userAgent", NullValueHandling = NullValueHandling.Ignore)]
        public string? UserAgent { get; set; }

        /// <summary>Gets or sets the user type, e.g. "premium".</summary>
        [JsonProperty("userType", NullValueHandling = NullValueHandling.Ignore)]
        public string? UserType { get; set; }

        /// <summary>Gets or sets arbitrary user data.</summary>
        [JsonProperty("userData", NullValueHandling = NullValueHandling.Ignore)]
        public Dictionary<string, string>? UserData { get; set; }

        /// <summary>Gets or sets the user country code.</summary>
        [JsonProperty("userCountry", NullValueHandling = NullValueHandling.Ignore)]
        public string? UserCountry { get; set; }

        /// <summary>Gets or sets the user region.</summary>
        [JsonProperty("userRegion", NullValueHandling = NullValueHandling.Ignore)]
        public string? UserRegion { get; set; }

        /// <summary>Gets or sets the user city.</summary>
        [JsonProperty("userCity", NullValueHandling = NullValueHandling.Ignore)]
        public string? UserCity { get; set; }

        /// <summary>Gets or sets the device type, e.g. "mobile".</summary>
        [JsonProperty("deviceType", NullValueHandling = NullValueHandling.Ignore)]
        public string? DeviceType { get; set; }

        /// <summary>Gets or sets the device OS, e.g. "iOS".</summary>
        [JsonProperty("deviceOS", NullValueHandling = NullValueHandling.Ignore)]
        public string? DeviceOS { get; set; }

        /// <summary>Gets or sets the device OS version.</summary>
        [JsonProperty("deviceOSVersion", NullValueHandling = NullValueHandling.Ignore)]
        public string? DeviceOSVersion { get; set; }

        /// <summary>Gets or sets the device browser.</summary>
        [JsonProperty("deviceBrowser", NullValueHandling = NullValueHandling.Ignore)]
        public string? DeviceBrowser { get; set; }

        /// <summary>Gets or sets the application name.</summary>
        [JsonProperty("appName", NullValueHandling = NullValueHandling.Ignore)]
        public string? AppName { get; set; }

        /// <summary>Gets or sets the application version name.</summary>
        [JsonProperty("appVersionName", NullValueHandling = NullValueHandling.Ignore)]
        public string? AppVersionName { get; set; }

        /// <summary>Gets or sets the application version ID / build number.</summary>
        [JsonProperty("appVersionID", NullValueHandling = NullValueHandling.Ignore)]
        public string? AppVersionID { get; set; }

        /// <summary>Gets or sets the referrer URL.</summary>
        [JsonProperty("referrer", NullValueHandling = NullValueHandling.Ignore)]
        public string? Referrer { get; set; }

        /// <summary>Gets or sets the referrer event.</summary>
        [JsonProperty("referrerEvent", NullValueHandling = NullValueHandling.Ignore)]
        public string? ReferrerEvent { get; set; }

        /// <summary>Gets or sets the UTM medium.</summary>
        [JsonProperty("referrerUtmMedium", NullValueHandling = NullValueHandling.Ignore)]
        public string? ReferrerUtmMedium { get; set; }

        /// <summary>Gets or sets the UTM source.</summary>
        [JsonProperty("referrerUtmSource", NullValueHandling = NullValueHandling.Ignore)]
        public string? ReferrerUtmSource { get; set; }

        /// <summary>Gets or sets the UTM campaign.</summary>
        [JsonProperty("referrerUtmCampaign", NullValueHandling = NullValueHandling.Ignore)]
        public string? ReferrerUtmCampaign { get; set; }

        /// <summary>Gets or sets the UTM content.</summary>
        [JsonProperty("referrerUtmContent", NullValueHandling = NullValueHandling.Ignore)]
        public string? ReferrerUtmContent { get; set; }

        /// <summary>Gets or sets the UTM term.</summary>
        [JsonProperty("referrerUtmTerm", NullValueHandling = NullValueHandling.Ignore)]
        public string? ReferrerUtmTerm { get; set; }

        /// <summary>Creates a new EventMeta by merging this instance with another. The other takes precedence.</summary>
        internal EventMeta MergeWith(EventMeta? other)
        {
            if (other == null)
            {
                return this;
            }

            return new EventMeta
            {
                Timestamp = other.Timestamp ?? Timestamp,
                TimestampEnd = other.TimestampEnd ?? TimestampEnd,
                UserId = other.UserId ?? UserId,
                UserIp = other.UserIp ?? UserIp,
                UserAgent = other.UserAgent ?? UserAgent,
                UserType = other.UserType ?? UserType,
                UserData = other.UserData ?? UserData,
                UserCountry = other.UserCountry ?? UserCountry,
                UserRegion = other.UserRegion ?? UserRegion,
                UserCity = other.UserCity ?? UserCity,
                DeviceType = other.DeviceType ?? DeviceType,
                DeviceOS = other.DeviceOS ?? DeviceOS,
                DeviceOSVersion = other.DeviceOSVersion ?? DeviceOSVersion,
                DeviceBrowser = other.DeviceBrowser ?? DeviceBrowser,
                AppName = other.AppName ?? AppName,
                AppVersionName = other.AppVersionName ?? AppVersionName,
                AppVersionID = other.AppVersionID ?? AppVersionID,
                Referrer = other.Referrer ?? Referrer,
                ReferrerEvent = other.ReferrerEvent ?? ReferrerEvent,
                ReferrerUtmMedium = other.ReferrerUtmMedium ?? ReferrerUtmMedium,
                ReferrerUtmSource = other.ReferrerUtmSource ?? ReferrerUtmSource,
                ReferrerUtmCampaign = other.ReferrerUtmCampaign ?? ReferrerUtmCampaign,
                ReferrerUtmContent = other.ReferrerUtmContent ?? ReferrerUtmContent,
                ReferrerUtmTerm = other.ReferrerUtmTerm ?? ReferrerUtmTerm,
            };
        }
    }
}
