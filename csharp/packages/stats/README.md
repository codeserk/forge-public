# Codeserk.ForgeStats

Stats client for [Forge](https://github.com/codeserk/forge-public). Targets `netstandard2.0` - compatible with Unity 2018.1+.

## Installation

Add via NuGet:

```sh
dotnet add package Codeserk.ForgeStats
```

For Unity, install `Newtonsoft.Json` via Package Manager (`com.unity.nuget.newtonsoft-json`) before adding this package.

## Usage

### Singleton

Initialise once at startup, then call `Track` anywhere without managing an instance.

```csharp
using Codeserk.ForgeStats;

ForgeStatsModule.Init(new ClientOptions
{
    BaseUrl = "https://api-events.forge.codeserk.es",
    Sdk = "YOUR_SDK_KEY",
});

// fire-and-forget
ForgeStatsModule.Track(new SendEventParams
{
    Content = [new EventContent { Type = "View", Name = "/home" }],
    Referrer = "https://referrer.example.com",
});
```

Use `SendEventAsync` if you need to await or handle errors yourself:

```csharp
await ForgeStatsModule.SendEventAsync(new SendEventParams
{
    Content = [new EventContent { Type = "View", Name = "/home" }],
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

client.Track(new SendEventParams
{
    Content = [new EventContent { Type = "View", Name = "/home" }],
});
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

Initialises the singleton client. Must be called before `Track` or `SendEventAsync`.

| Option    | Type                         | Description                                     |
| --------- | ---------------------------- | ----------------------------------------------- |
| `BaseUrl` | `string`                     | Base URL of the Forge Stats API                 |
| `Sdk`     | `string`                     | Base64-encoded SDK key from the Forge dashboard |
| `OnError` | `Action<string, Exception>?` | Optional. Called when `Track` fails             |

### `ForgeStatsModule.Track(params)`

Fire-and-forget event. Calls `OnError` on failure instead of throwing.

### `ForgeStatsModule.SendEventAsync(params)`

Same as `Track` but returns a `Task` - useful when you need to await or catch errors.

### `ForgeStatsModule.GetClient()`

Returns the singleton `Client` instance. Throws if `Init` has not been called.
