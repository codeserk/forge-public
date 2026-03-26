namespace Codeserk.ForgeStats
{
    /// <summary>Device category for use with <see cref="UserAgentBuilder"/>.</summary>
    public enum Device
    {
        Desktop,
        Mobile,
        Tablet,
        Console,
        TV,
    }

    /// <summary>Operating system for use with <see cref="UserAgentBuilder"/>.</summary>
    public enum OS
    {
        IOS,
        Android,
        Windows,
        MacOS,
        Linux,
        WebGL,
    }

    /// <summary>Builds user agent strings from device and OS combinations.</summary>
    public static class UserAgentBuilder
    {
        /// <summary>Returns a representative user agent string for the given device and OS.</summary>
        public static string Build(Device device, OS os)
        {
            return (device, os) switch
            {
                (Device.Mobile, OS.IOS) => "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                (Device.Tablet, OS.IOS) => "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                (Device.Mobile, OS.Android) => "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
                (Device.Tablet, OS.Android) => "Mozilla/5.0 (Linux; Android 14; Pixel Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                (Device.Desktop, OS.Windows) => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                (Device.Desktop, OS.MacOS) => "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
                (Device.Desktop, OS.Linux) => "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                (Device.Desktop, OS.WebGL) => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                _ => $"ForgeStats/1.0 ({device}; {os})",
            };
        }
    }
}
