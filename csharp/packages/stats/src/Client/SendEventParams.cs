namespace Codeserk.ForgeStats
{
    /// <summary>Parameters for <see cref="Client.SendEvents"/>.</summary>
    public class SendEventParams
    {
        /// <summary>Gets or sets the content items to track.</summary>
        public EventContent[] Content { get; set; } = null!;

        /// <summary>Gets or sets the optional request-level metadata.</summary>
        public EventMeta? Meta { get; set; }
    }
}
