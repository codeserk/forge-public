---
title: Unity SDK
description: Track events from Unity with automatic device/OS detection and config-driven initialization.
---

Wraps the [C# SDK](/docs/stats/usage/sdks/csharp) with automatic device/OS detection and config-driven initialization - no code needed to get started.

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
3. Fill in your **URL** and **SDK key** from the Forge dashboard

No code initialization needed - `ForgeStatsManager` loads the config lazily on first use.

## Usage

```csharp
using Codeserk.ForgeStats.Unity;

// Track a screen view
ForgeStatsManager.TrackView("MainMenu");
```

Device and OS are detected automatically from `SystemInfo` and `Application.platform`.

## API

### `ForgeStatsManager.TrackView(name)`

Fire-and-forget view event. Initializes from `StatsConfig` on first call.

### `ForgeStatsManager.GetEventMeta()`

Returns an `EventMeta` with the current device's user agent string.

### `ForgeStatsManager.GetCurrentDevice()`

Maps `SystemInfo.deviceType` to a `Device` enum value (`Mobile`, `Console`, `Desktop`).

### `ForgeStatsManager.GetCurrentOS()`

Maps `Application.platform` to an `OS` enum value (`IOS`, `Android`, `Windows`, `MacOS`, `Linux`, `WebGL`).
