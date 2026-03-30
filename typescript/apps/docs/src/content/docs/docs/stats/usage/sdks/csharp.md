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

Initialise once at startup, then call `Track` anywhere without managing an instance.

```csharp
using Codeserk.ForgeStats;

ForgeStatsModule.Init(new ClientOptions
{
    BaseUrl = "https://api-events.forge.codeserk.es",
    Sdk = "YOUR_SDK_KEY",
});

// fire-and-forget - single event
ForgeStatsModule.Track(
    new EventContent { Type = "View", Name = "/home" },
    new EventMeta { Referrer = "https://referrer.example.com" }
);

// fire-and-forget - multiple events
ForgeStatsModule.TrackMany(new SendEventParams
{
    Content = [
        new EventContent { Type = "View", Name = "/home" },
        new EventContent { Type = "Click", Name = "cta-button" },
    ],
    Meta = new EventMeta { Referrer = "https://referrer.example.com" },
});
```

Use `SendEvent` / `SendEvents` if you need to await or handle errors yourself:

```csharp
await ForgeStatsModule.SendEvent(new EventContent { Type = "View", Name = "/home" });

await ForgeStatsModule.SendEvents(new SendEventParams
{
    Content = [new EventContent { Type = "View", Name = "/home" }],
    Meta = new EventMeta { UserId = "user_123" },
});
```

### Instance

```csharp
using Codeserk.ForgeStats;

var client = new Client(new ClientOptions
{
    BaseUrl = "https://api-events.forge.codeserk.es",
    Sdk = "YOUR_SDK_KEY",
});

client.Track(new EventContent { Type = "View", Name = "/home" });
```

### Custom error handler

By default errors from `Track` are silently swallowed. Pass `OnError` to handle them:

```csharp
ForgeStatsModule.Init(new ClientOptions
{
    BaseUrl = "https://api-events.forge.codeserk.es",
    Sdk = "YOUR_SDK_KEY",
    OnError = (msg, ex) => Debug.LogError($"{msg}: {ex.Message}"),
});
```

## API

### `ForgeStatsModule.Init(options)`

Initialises the singleton client. Must be called before `Track` or `SendEvent`.

| Option    | Type                         | Description                                     |
| --------- | ---------------------------- | ----------------------------------------------- |
| `BaseUrl` | `string`                     | Base URL of the Forge Stats API                 |
| `Sdk`     | `string`                     | Base64-encoded SDK key from the Forge dashboard |
| `OnError` | `Action<string, Exception>?` | Optional. Called when `Track` fails             |

### `ForgeStatsModule.Track(content, meta?)`

Fire-and-forget for a single event. Calls `OnError` on failure instead of throwing.

### `ForgeStatsModule.TrackMany(params)`

Fire-and-forget for multiple events in one request.

### `ForgeStatsModule.SendEvent(content, meta?)`

Same as `Track` but returns a `Task` - use this when you need to await or catch errors.

### `ForgeStatsModule.SendEvents(params)`

Same as `TrackMany` but returns a `Task`.

### `ForgeStatsModule.GetClient()`

Returns the singleton `Client` instance. Throws if `Init` has not been called.

### `EventMeta`

Optional metadata attached to any event or batch.

| Field       | Type     | Description         |
| ----------- | -------- | ------------------- |
| `Referrer`  | `string` | Referring URL       |
| `UserAgent` | `string` | User-Agent string   |
