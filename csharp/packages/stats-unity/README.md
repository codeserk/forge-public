# Codeserk.ForgeStatsUnity

Unity-specific utilities for [Forge Stats](https://github.com/codeserk/forge-public). Wraps `com.codeserk.forge-stats` with automatic device/OS detection and config-driven initialization.

## Installation

`com.codeserk.forge-stats` is listed as a dependency and will be installed automatically.

1. Open **Window > Package Manager**
2. Click **+** and choose **Add package from git URL...**
3. Enter:
   ```
   https://github.com/codeserk/forge-public.git?path=csharp/packages/stats-unity
   ```

To pin a specific version, append a tag:
```
https://github.com/codeserk/forge-public.git?path=csharp/packages/stats-unity#v0.0.1
```

Alternatively, add it directly to `Packages/manifest.json`:
```json
{
  "dependencies": {
    "com.codeserk.forge-stats-unity": "https://github.com/codeserk/forge-public.git?path=csharp/packages/stats-unity"
  }
}
```

## Setup

1. Create a config asset: **Assets > Create > Forge > Stats Config**
2. Place it in a `Resources` folder, named exactly `StatsConfig` (e.g. `Assets/Resources/StatsConfig.asset`)
3. Fill in your **URL** and **SDK key** from the Forge dashboard

No code initialization is needed - `StatsManager` loads the config lazily on first use.

## Usage

```csharp
using Codeserk.ForgeStats.Unity;

// Track a screen view
StatsManager.TrackView("MainMenu");
```

Device and OS are detected automatically from `SystemInfo` and `Application.platform`.

## API

### `StatsManager.TrackView(name)`

Fire-and-forget view event. Initializes from `StatsConfig` on first call.

### `StatsManager.GetEventMeta()`

Returns an `EventMeta` with the current device's user agent string.

### `StatsManager.GetCurrentDevice()`

Maps `SystemInfo.deviceType` to a `Device` enum value (`Mobile`, `Console`, `Desktop`).

### `StatsManager.GetCurrentOS()`

Maps `Application.platform` to an `OS` enum value (`IOS`, `Android`, `Windows`, `MacOS`, `Linux`, `WebGL`).
