#if !UNITY_2018_1_OR_NEWER
// Minimal stubs so the project can be built and linted outside of Unity.
// These are never compiled in actual Unity builds.
// ReSharper disable All
#pragma warning disable

namespace UnityEngine
{
    public class Object { }

    public class ScriptableObject : Object { }

    [System.AttributeUsage(System.AttributeTargets.Class)]
    public class CreateAssetMenuAttribute : System.Attribute
    {
        public string fileName { get; set; }
        public string menuName { get; set; }
    }

    public static class Debug
    {
        public static void LogError(object message) { }
    }

    public static class Resources
    {
        public static T Load<T>(string path) where T : Object => default!;
    }

    public enum DeviceType { Unknown, Handheld, Console, Desktop }

    public static class SystemInfo
    {
        public static DeviceType deviceType => DeviceType.Desktop;
        public static string operatingSystem => "Windows 10";
    }

    public enum RuntimePlatform
    {
        OSXEditor, OSXPlayer,
        WindowsPlayer, WindowsEditor,
        IPhonePlayer,
        Android,
        LinuxPlayer, LinuxEditor,
        WebGLPlayer,
    }

    public static class Application
    {
        public static RuntimePlatform platform => RuntimePlatform.WindowsPlayer;
        public static string productName => "StubApp";
        public static string version => "1.0.0";
    }
}

#pragma warning restore
#endif
