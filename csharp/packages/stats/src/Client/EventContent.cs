using Newtonsoft.Json;

namespace Codeserk.ForgeStats
{
    /// <summary>A single piece of content to track in an event.</summary>
    public class EventContent
    {
        /// <summary>Gets or sets the event type, e.g. "View".</summary>
        [JsonProperty("type")]
        public string Type { get; set; } = null!;

        /// <summary>Gets or sets the event name, e.g. the page path.</summary>
        [JsonProperty("name")]
        public string Name { get; set; } = null!;

        /// <summary>Gets or sets the user agent string.</summary>
        [JsonProperty("userAgent", NullValueHandling = NullValueHandling.Ignore)]
        public string? UserAgent { get; set; }
    }
}
