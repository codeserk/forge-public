---
title: Unity SDK
description: Track events from Unity with automatic device/OS detection and config-driven initialization.
---

Wraps the [C# SDK](/docs/stats/usage/sdks/csharp) with automatic device/OS detection and config-driven initialization - no code needed to get started.

Automatically detects and sets as default metadata:
- `DeviceType` (mobile, console, desktop)
- `DeviceOS` (iOS, Android, Windows, macOS, Linux, WebGL)
- `DeviceOSVersion` (from `SystemInfo.operatingSystem`)
- `AppName` (from `Application.productName`)
- `AppVersionName` (from `Application.version`)
- `UserAgent` (generated from device/OS)

## Installation

UPM does not support automatic resolution of git-based dependencies, so both packages must be added manually.

Add them to `Packages/manifest.json`:
```json
{
  "dependencies": {
    "es.codeserk.forge-stats": "https://github.com/codeserk/forge-public.git?path=csharp/packages/stats",
    "es.codeserk.forge-stats-unity": "https://github.com/codeserk/forge-public.git?path=csharp/packages/stats-unity"
  }
}
```

Or via **Window > Package Manager > + > Add package from git URL...**, adding each URL separately:
```
https://github.com/codeserk/forge-public.git?path=csharp/packages/stats
https://github.com/codeserk/forge-public.git?path=csharp/packages/stats-unity
```

To pin a specific version, append a tag:
```
https://github.com/codeserk/forge-public.git?path=csharp/packages/stats-unity#v0.0.1
```

## Setup

1. Create a config asset: **Assets > Create > Forge > Stats Config**
2. Place it in a `Resources` folder, named exactly `StatsConfig` (e.g. `Assets/Resources/StatsConfig.asset`)
3. Fill in your **SDK key** from the Forge dashboard (URL defaults to production)

No code initialization needed - `ForgeStatsManager` loads the config lazily on first use.

## Usage

```csharp
using Codeserk.ForgeStats.Unity;

// Track a screen view - device info is set automatically
ForgeStatsManager.TrackView("MainMenu");

// Add user info after login
ForgeStatsManager.UpdateMeta(new EventMeta { UserId = "user_123" });
```

### Custom metadata

```csharp
// Merge additional metadata
ForgeStatsManager.UpdateMeta(new EventMeta
{
    UserId = "user_123",
    UserType = "premium",
});

// Or replace all defaults (loses auto-detected device info)
ForgeStatsManager.SetMeta(new EventMeta { AppName = "CustomName" });
```

## API

### `ForgeStatsManager.TrackView(name, meta?)`

Fire-and-forget view event. Initializes from `StatsConfig` on first call.

### `ForgeStatsManager.Track(content, meta?)` / `TrackMany(params)`

Fire-and-forget single or multiple events.

### `ForgeStatsManager.SendEvent(content, meta?)` / `SendEvents(params)`

Async variants that return a `Task`.

### `ForgeStatsManager.SetMeta(meta)` / `UpdateMeta(meta)`

Replace or merge default metadata on the underlying client.
