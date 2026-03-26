using System.Threading.Tasks;
using Codeserk.ForgeStats;
using UnityEngine;

namespace Codeserk.ForgeStats.Unity
{
    // ForgeStatsManager is the main entry point for tracking analytics events in Unity.
    // It wraps ForgeStatsModule with Unity-specific initialization and device detection.
    //
    // Setup:
    //   1. Create a StatsConfig asset: Assets > Create > Forge > Stats Config
    //   2. Place it inside a Resources folder (e.g. Assets/Resources/StatsConfig.asset)
    //   3. Fill in your Forge Stats URL and SDK key from the dashboard
    //
    // Usage:
    //   ForgeStatsManager.TrackView("MainMenu");
    //
    // The manager initializes lazily on first call - no manual Init() needed.
    // See https://forge.codeserk.es/docs/sdks/csharp-unity
    public static class ForgeStatsManager
    {
        private static bool _initialized;

        public static void TrackView(string name, EventMeta? meta = null)
        {
            EnsureInitialized();
            ForgeStatsModule.Track(new EventContent { Type = "View", Name = name }, meta ?? GetEventMeta());
        }

        public static Task SendEvent(EventContent content, EventMeta? meta = null)
        {
            EnsureInitialized();
            return ForgeStatsModule.SendEvent(content, meta ?? GetEventMeta());
        }

        public static Task SendEvents(SendEventParams eventParams)
        {
            EnsureInitialized();
            if (eventParams.Meta == null)
            {
                eventParams = new SendEventParams { Content = eventParams.Content, Meta = GetEventMeta() };
            }

            return ForgeStatsModule.SendEvents(eventParams);
        }

        public static void Track(EventContent content, EventMeta? meta = null)
        {
            EnsureInitialized();
            ForgeStatsModule.Track(content, meta ?? GetEventMeta());
        }

        public static void TrackMany(SendEventParams eventParams)
        {
            EnsureInitialized();
            if (eventParams.Meta == null)
            {
                eventParams = new SendEventParams { Content = eventParams.Content, Meta = GetEventMeta() };
            }

            ForgeStatsModule.TrackMany(eventParams);
        }

        public static EventMeta GetEventMeta()
        {
            return new EventMeta { UserAgent = GetUserAgent() };
        }

        public static string GetUserAgent()
        {
            return UserAgentBuilder.Build(GetCurrentDevice(), GetCurrentOS());
        }

        public static Device GetCurrentDevice()
        {
            return SystemInfo.deviceType switch
            {
                DeviceType.Handheld => Device.Mobile,
                DeviceType.Console => Device.Console,
                _ => Device.Desktop,
            };
        }

        public static OS GetCurrentOS()
        {
            return Application.platform switch
            {
                RuntimePlatform.IPhonePlayer => OS.IOS,
                RuntimePlatform.Android => OS.Android,
                RuntimePlatform.WindowsPlayer => OS.Windows,
                RuntimePlatform.WindowsEditor => OS.Windows,
                RuntimePlatform.OSXPlayer => OS.MacOS,
                RuntimePlatform.OSXEditor => OS.MacOS,
                RuntimePlatform.LinuxPlayer => OS.Linux,
                RuntimePlatform.LinuxEditor => OS.Linux,
                RuntimePlatform.WebGLPlayer => OS.WebGL,
                _ => OS.Windows,
            };
        }

        private static void EnsureInitialized()
        {
            if (_initialized)
            {
                return;
            }

            var config = Resources.Load<StatsConfig>("StatsConfig");
            if (config == null)
            {
                Debug.LogError(
                    "[ForgeStats] StatsConfig asset not found. " +
                    "Create one via Assets > Create > Forge > Stats Config, " +
                    "place it in a Resources folder as 'StatsConfig.asset', " +
                    "and fill in your URL and SDK key. " +
                    "See https://forge.codeserk.es/docs/sdks/csharp-unity");
                return;
            }

            ForgeStatsModule.Init(new ClientOptions { BaseUrl = config.Url, Sdk = config.Sdk });
            _initialized = true;
        }
    }
}
