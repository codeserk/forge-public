using System;

namespace Codeserk.ForgeStats
{
    /// <summary>Options used to initialise a <see cref="Client"/> instance.</summary>
    public class ClientOptions
    {
        /// <summary>Gets or sets the base URL of the Forge Stats API.</summary>
        public string BaseUrl { get; set; } = null!;

        /// <summary>Gets or sets the base64-encoded SDK key from the Forge dashboard.</summary>
        public string Sdk { get; set; } = null!;

        /// <summary>Gets or sets the error callback. Called when <see cref="Client.Track"/> fails. Defaults to a no-op.</summary>
        public Action<string, Exception>? OnError { get; set; }
    }
}
