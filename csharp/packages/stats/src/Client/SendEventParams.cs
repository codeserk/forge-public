namespace Codeserk.ForgeStats
{
    /// <summary>Parameters for <see cref="Client.SendEventAsync"/>.</summary>
    public class SendEventParams
    {
        /// <summary>Gets or sets the content items to track.</summary>
        public EventContent[] Content { get; set; } = null!;

        /// <summary>Gets or sets the optional referrer.</summary>
        public string? Referrer { get; set; }
    }
}
