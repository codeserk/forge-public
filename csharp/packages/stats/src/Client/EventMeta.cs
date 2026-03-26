using Newtonsoft.Json;

namespace Codeserk.ForgeStats
{
    /// <summary>Request-level metadata attached alongside event content.</summary>
    public class EventMeta
    {
        /// <summary>Gets or sets the referrer URL.</summary>
        [JsonProperty("referrer", NullValueHandling = NullValueHandling.Ignore)]
        public string? Referrer { get; set; }

        /// <summary>Gets or sets the user agent string. See <see cref="UserAgentBuilder"/> to build one from device and OS.</summary>
        [JsonProperty("userAgent", NullValueHandling = NullValueHandling.Ignore)]
        public string? UserAgent { get; set; }
    }
}
