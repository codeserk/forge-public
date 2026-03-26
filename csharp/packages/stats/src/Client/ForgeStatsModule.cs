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

        /// <summary>Sends a single event using the singleton client.</summary>
        public static Task SendEvent(EventContent content, EventMeta? meta = null) => GetClient().SendEvent(content, meta);

        /// <summary>Sends multiple events using the singleton client.</summary>
        public static Task SendEvents(SendEventParams eventParams) => GetClient().SendEvents(eventParams);

        /// <summary>Fire-and-forget single event using the singleton client.</summary>
        public static void Track(EventContent content, EventMeta? meta = null) => GetClient().Track(content, meta);

        /// <summary>Fire-and-forget multiple events using the singleton client.</summary>
        public static void TrackMany(SendEventParams eventParams) => GetClient().TrackMany(eventParams);
    }
}
