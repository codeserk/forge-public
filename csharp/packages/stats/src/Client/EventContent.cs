using System.Collections.Generic;
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

        /// <summary>Gets or sets the optional bucket for grouping.</summary>
        [JsonProperty("bucket", NullValueHandling = NullValueHandling.Ignore)]
        public string? Bucket { get; set; }

        /// <summary>Gets or sets the trace ID for distributed tracing.</summary>
        [JsonProperty("traceID", NullValueHandling = NullValueHandling.Ignore)]
        public string? TraceID { get; set; }

        /// <summary>Gets or sets the span ID for distributed tracing.</summary>
        [JsonProperty("spanID", NullValueHandling = NullValueHandling.Ignore)]
        public string? SpanID { get; set; }

        /// <summary>Gets or sets the parent span ID for distributed tracing.</summary>
        [JsonProperty("parentSpanID", NullValueHandling = NullValueHandling.Ignore)]
        public string? ParentSpanID { get; set; }

        /// <summary>Gets or sets arbitrary key/value data attached to this content item.</summary>
        [JsonProperty("data", NullValueHandling = NullValueHandling.Ignore)]
        public Dictionary<string, object>? Data { get; set; }
    }
}
