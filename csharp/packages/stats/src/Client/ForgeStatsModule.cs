using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Codeserk.ForgeStats
{
    /// <summary>Singleton module for the Forge Stats client.</summary>
    public static class ForgeStatsModule
    {
        private static Client? _client;

        /// <summary>Initialises the singleton client. Must be called before any other method.</summary>
        public static void Init(ClientOptions options, HttpClient? httpClient = null)
        {
            _client = new Client(options, httpClient);
        }

        /// <summary>Returns the singleton client. Throws if <see cref="Init"/> has not been called.</summary>
        public static Client GetClient()
        {
            if (_client == null)
            {
                throw new InvalidOperationException("[forge-stats] Client not initialised. Call ForgeStatsModule.Init() first.");
            }

            return _client;
        }

        /// <summary>Sends a tracking event using the singleton client.</summary>
        public static Task SendEventAsync(SendEventParams eventParams) => GetClient().SendEventAsync(eventParams);

        /// <summary>Fire-and-forget send using the singleton client.</summary>
        public static void Track(SendEventParams eventParams) => GetClient().Track(eventParams);
    }
}
