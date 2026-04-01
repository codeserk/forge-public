# @codeserk/forge-stats

Stats client for [Forge](https://github.com/codeserk/forge-public). Works in browser and Node.js 18+.

> **React Native:** use [`@codeserk/forge-stats-react-native`](https://www.npmjs.com/package/@codeserk/forge-stats-react-native) instead - it ships a pure-JS signing implementation that works without `crypto.subtle`.

## Installation

```sh
npm install @codeserk/forge-stats
```

## Usage

### Module (singleton)

Initialise once at app startup, then call `track` anywhere without managing an instance.

```ts
import { init, track, trackView, setMeta, updateMeta } from '@codeserk/forge-stats'

init({ sdk: 'YOUR_SDK_KEY' })

// track a single event - fire-and-forget
track({ type: 'View', name: '/home' })

// with per-call metadata (merged with defaults, takes precedence)
track({ type: 'Click', name: 'cta-button' }, { userId: 'user_123' })

// convenience shorthand for view events
trackView('/home')
trackView('/about', { referrer: 'https://example.com' })
```

### Default metadata

In browser environments, `referrer` and `userAgent` are auto-detected. You can set or update default metadata that is merged into every request:

```ts
// replace all default metadata
setMeta({ appName: 'MyApp', appVersionName: '2.3.1' })

// merge into existing defaults
updateMeta({ userId: 'user_123' })
```

Per-call metadata takes precedence over defaults.

### Multiple events

```ts
import { trackMany } from '@codeserk/forge-stats'

trackMany({
  content: [
    { type: 'View', name: '/home' },
    { type: 'Click', name: 'cta-button', data: { label: 'Get started' } },
  ],
  meta: { userId: 'user_123' },
})
```

### Async variants

Use `sendEvent` / `sendEvents` if you need to await the result or handle errors yourself:

```ts
import { sendEvent, sendEvents } from '@codeserk/forge-stats'

await sendEvent({ type: 'View', name: '/home' })

await sendEvents({
  content: [{ type: 'View', name: '/home' }],
})
```

### Error tracking

Track errors manually or capture them globally:

```ts
import { trackError, sendError, captureGlobalErrors } from '@codeserk/forge-stats'

// fire-and-forget
trackError(new Error('Something went wrong'))

// with options
trackError(new Error('Oops'), { handled: true, data: { page: '/checkout' } })

// await the result
await sendError(new Error('Critical failure'))

// capture all uncaught errors and unhandled rejections globally
captureGlobalErrors()
```

### Instance

```ts
import { Client } from '@codeserk/forge-stats'

const client = new Client({ sdk: 'YOUR_SDK_KEY' })

client.setMeta({ appName: 'MyApp' })
client.trackView('/home')
client.trackError(new Error('Oops'))
```

### Custom logger

By default errors are logged to `console`. Pass your own logger to override:

```ts
init({
  sdk: 'YOUR_SDK_KEY',
  logger: { error: (...args) => myLogger.error(...args) },
})
```

## API

### `init(options)`

Initialises the singleton client. Must be called before any send/track calls.

| Option       | Type         | Description                                                         |
| ------------ | ------------ | ------------------------------------------------------------------- |
| `baseUrl`    | `string`     | Base URL of the Forge Stats API. Defaults to `https://api-events.forge.codeserk.es` |
| `sdk`        | `string`     | Base64-encoded SDK key from the Forge dashboard                     |
| `logger`     | `Logger`     | Optional. Defaults to `console`                                     |
| `signHashFn` | `SignHashFn` | Optional. Custom HMAC-SHA256 implementation. Defaults to Web Crypto |

### `setMeta(meta)`

Replaces the default metadata merged into every request.

### `updateMeta(meta)`

Merges new metadata into the existing defaults.

### `track(content, meta?)`

Fire-and-forget for a single event. Swallows errors and logs them via the logger.

### `trackMany(params)`

Fire-and-forget for multiple events in one request.

### `trackView(name, meta?)`

Convenience shorthand - equivalent to `track({ type: 'View', name }, meta)`.

### `trackError(error, options?, meta?)`

Fire-and-forget error tracking. Logs send failures via the logger.

### `sendEvent(content, meta?)`

Same as `track` but returns a `Promise`.

### `sendEvents(params)`

Same as `trackMany` but returns a `Promise`.

### `sendError(error, options?, meta?)`

Same as `trackError` but returns a `Promise`.

### `captureGlobalErrors()`

Registers global error handlers (browser, Node.js, React Native) to automatically track uncaught errors and unhandled rejections.

### `getClient()`

Returns the singleton `Client` instance. Throws if `init()` has not been called.

### `EventContent`

| Field          | Type        | Required | Description                        |
| -------------- | ----------- | -------- | ---------------------------------- |
| `type`         | `string`    | yes      | Event type, e.g. `'View'`         |
| `name`         | `string`    | yes      | Event name, e.g. a page path      |
| `bucket`       | `string`    | no       | Grouping bucket                    |
| `traceID`      | `string`    | no       | Trace ID for distributed tracing   |
| `spanID`       | `string`    | no       | Span ID for distributed tracing    |
| `parentSpanID` | `string`    | no       | Parent span ID                     |
| `data`         | `EventData` | no       | Arbitrary key/value data           |

### `EventMeta`

Optional metadata attached to any event or batch. All fields are optional.

| Field               | Type        | Description                             |
| ------------------- | ----------- | --------------------------------------- |
| `timestamp`         | `string`    | ISO 8601 timestamp (defaults to server) |
| `timestampEnd`      | `string`    | ISO 8601 end timestamp                  |
| `userId`            | `string`    | Application user ID                     |
| `userIp`            | `string`    | Client IP override                      |
| `userAgent`         | `string`    | User-Agent string                       |
| `userType`          | `string`    | User type, e.g. `'premium'`            |
| `userData`          | `EventData` | Arbitrary user data                     |
| `userCountry`       | `string`    | Country code, e.g. `'US'`             |
| `userRegion`        | `string`    | Region, e.g. `'California'`           |
| `userCity`          | `string`    | City, e.g. `'San Francisco'`          |
| `deviceType`        | `string`    | Device type, e.g. `'mobile'`          |
| `deviceOS`          | `string`    | OS, e.g. `'iOS'`                      |
| `deviceOSVersion`   | `string`    | OS version, e.g. `'17.4.1'`           |
| `deviceBrowser`     | `string`    | Browser, e.g. `'Safari'`              |
| `appName`           | `string`    | Application name                        |
| `appVersionName`    | `string`    | Version name, e.g. `'2.3.1'`          |
| `appVersionID`      | `string`    | Version ID / build number               |
| `referrer`          | `string`    | Referring URL                           |
| `referrerEvent`     | `string`    | Referrer event                          |
| `referrerUtmMedium` | `string`    | UTM medium                              |
| `referrerUtmSource` | `string`    | UTM source                              |
| `referrerUtmCampaign`| `string`   | UTM campaign                            |
| `referrerUtmContent`| `string`    | UTM content                             |
| `referrerUtmTerm`   | `string`    | UTM term                                |

### `ErrorEventOptions`

| Field       | Type        | Default | Description                                |
| ----------- | ----------- | ------- | ------------------------------------------ |
| `handled`   | `boolean`   | `true`  | Whether the error was caught by user code  |
| `data`      | `EventData` |         | Extra data attached to the error event     |
| `maxFrames` | `number`    | `3`     | Stack frames used for fingerprinting       |

`EventData` is `Record<string, string | number | boolean>`.
