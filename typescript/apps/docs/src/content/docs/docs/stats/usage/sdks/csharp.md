---
title: C# SDK
description: Track events from any .NET project using the C# SDK. Compatible with Unity 2018.1+.
---

Targets `netstandard2.0` - compatible with Unity 2018.1+, ASP.NET Core, and any other .NET project.

## Installation

### Unity (recommended)

1. Open **Window > Package Manager**
2. Click **+** and choose **Add package from git URL...**
3. Enter:
   ```
   https://github.com/codeserk/forge-public.git?path=csharp/packages/stats
   ```

This automatically installs `com.unity.nuget.newtonsoft-json` as a dependency.

To pin a specific version, append a tag:
```
https://github.com/codeserk/forge-public.git?path=csharp/packages/stats#v0.0.1
```

Alternatively, add it directly to `Packages/manifest.json`:
```json
{
  "dependencies": {
    "es.codeserk.forge-stats": "https://github.com/codeserk/forge-public.git?path=csharp/packages/stats"
  }
}
```

### Other .NET projects

```sh
dotnet add package Codeserk.ForgeStats
```

## Usage

### Singleton (recommended)

Initialise once at startup, then call `Track` anywhere without managing an instance. `BaseUrl` defaults to `https://api-events.forge.codeserk.es` (production).

```csharp
using Codeserk.ForgeStats;

ForgeStatsModule.Init(new ClientOptions { Sdk = "YOUR_SDK_KEY" });

// fire-and-forget - single event
ForgeStatsModule.Track(new EventContent { Type = "View", Name = "/home" });

// with per-call metadata
ForgeStatsModule.Track(
    new EventContent { Type = "Click", Name = "cta-button" },
    new EventMeta { UserId = "user_123" }
);
```

### Default metadata

Set default metadata that is merged into every request. Per-call metadata takes precedence.

```csharp
// replace all defaults
ForgeStatsModule.SetMeta(new EventMeta { AppName = "MyApp", AppVersionName = "2.3.1" });

// merge into existing defaults
ForgeStatsModule.UpdateMeta(new EventMeta { UserId = "user_123" });
```

### Multiple events

```csharp
ForgeStatsModule.TrackMany(new SendEventParams
{
    Content = new[]
    {
        new EventContent { Type = "View", Name = "/home" },
        new EventContent { Type = "Click", Name = "cta-button" },
    },
});
```

### Async variants

Use `SendEvent` / `SendEvents` if you need to await or handle errors yourself:

```csharp
await ForgeStatsModule.SendEvent(new EventContent { Type = "View", Name = "/home" });
```

### Instance

```csharp
using Codeserk.ForgeStats;

var client = new Client(new ClientOptions { Sdk = "YOUR_SDK_KEY" });

client.SetMeta(new EventMeta { AppName = "MyApp" });
client.Track(new EventContent { Type = "View", Name = "/home" });
```

### Custom error handler

By default errors from `Track` are silently swallowed. Pass `OnError` to handle them:

```csharp
ForgeStatsModule.Init(new ClientOptions
{
    Sdk = "YOUR_SDK_KEY",
    OnError = (msg, ex) => Console.Error.WriteLine($"{msg}: {ex.Message}"),
});
```

## API

### `ForgeStatsModule.Init(options)`

Initialises the singleton client. Must be called before any other method.

| Option    | Type                         | Description                                                        |
| --------- | ---------------------------- | ------------------------------------------------------------------ |
| `BaseUrl` | `string`                     | Defaults to `https://api-events.forge.codeserk.es`                 |
| `Sdk`     | `string`                     | Base64-encoded SDK key from the Forge dashboard                    |
| `OnError` | `Action<string, Exception>?` | Optional. Called when `Track` fails                                |

### `SetMeta(meta)` / `UpdateMeta(meta)`

Replace or merge default metadata for every request.

### `Track(content, meta?)` / `TrackMany(params)`

Fire-and-forget single or multiple events.

### `SendEvent(content, meta?)` / `SendEvents(params)`

Same as `Track`/`TrackMany` but returns a `Task`.

### `GetClient()`

Returns the singleton `Client` instance. Throws if `Init` has not been called.
