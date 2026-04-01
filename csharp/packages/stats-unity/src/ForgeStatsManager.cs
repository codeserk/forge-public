using System;
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
    // Device type, OS, app name, and version are detected automatically.
    // See https://forge.codeserk.es/docs/sdks/csharp-unity
    public static class ForgeStatsManager
    {
        private static bool _initialized;

        /// <summary>Replaces the default metadata on the underlying client.</summary>
        public static void SetMeta(EventMeta meta)
        {
            EnsureInitialized();
            ForgeStatsModule.SetMeta(meta);
        }

        /// <summary>Merges new metadata into the existing defaults.</summary>
        public static void UpdateMeta(EventMeta meta)
        {
            EnsureInitialized();
            ForgeStatsModule.UpdateMeta(meta);
        }

        public static void TrackView(string name, EventMeta? meta = null)
        {
            EnsureInitialized();
            ForgeStatsModule.Track(new EventContent { Type = "View", Name = name }, meta);
        }

        public static Task SendEvent(EventContent content, EventMeta? meta = null)
        {
            EnsureInitialized();
            return ForgeStatsModule.SendEvent(content, meta);
        }

        public static Task SendEvents(SendEventParams eventParams)
        {
            EnsureInitialized();
            return ForgeStatsModule.SendEvents(eventParams);
        }

        public static void Track(EventContent content, EventMeta? meta = null)
        {
            EnsureInitialized();
            ForgeStatsModule.Track(content, meta);
        }

        public static void TrackMany(SendEventParams eventParams)
        {
            EnsureInitialized();
            ForgeStatsModule.TrackMany(eventParams);
        }

        /// <summary>Sends an error event to the API.</summary>
        public static Task SendError(Exception error, bool handled = true, EventMeta? meta = null)
        {
            EnsureInitialized();
            return ForgeStatsModule.SendError(error, handled, meta);
        }

        /// <summary>Fire-and-forget error tracking.</summary>
        public static void TrackError(Exception error, bool handled = true, EventMeta? meta = null)
        {
            EnsureInitialized();
            ForgeStatsModule.TrackError(error, handled, meta);
        }

        private static string GetDeviceType()
        {
            return SystemInfo.deviceType switch
            {
                DeviceType.Handheld => "mobile",
                DeviceType.Console => "console",
                _ => "desktop",
            };
        }

        private static string GetDeviceOS()
        {
            return Application.platform switch
            {
                RuntimePlatform.IPhonePlayer => "iOS",
                RuntimePlatform.Android => "Android",
                RuntimePlatform.WindowsPlayer => "Windows",
                RuntimePlatform.WindowsEditor => "Windows",
                RuntimePlatform.OSXPlayer => "macOS",
                RuntimePlatform.OSXEditor => "macOS",
                RuntimePlatform.LinuxPlayer => "Linux",
                RuntimePlatform.LinuxEditor => "Linux",
                RuntimePlatform.WebGLPlayer => "WebGL",
                _ => "Unknown",
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

            ForgeStatsModule.Init(new ClientOptions
            {
                BaseUrl = config.Url,
                Sdk = config.Sdk,
                OnError = (msg, ex) => Debug.LogError($"{msg}: {ex.Message}"),
            });

            ForgeStatsModule.SetMeta(new EventMeta
            {
                DeviceType = GetDeviceType(),
                DeviceOS = GetDeviceOS(),
                DeviceOSVersion = SystemInfo.operatingSystem,
                AppName = Application.productName,
                AppVersionName = Application.version,
            });

            _initialized = true;
        }
    }
}
