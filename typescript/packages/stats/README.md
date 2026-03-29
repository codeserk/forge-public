# @codeserk/forge-stats

Stats client for [Forge](https://github.com/codeserk/forge-public). Works in browser, Node.js, and React Native.

> **React Native:** requires a `crypto.subtle` polyfill such as [`react-native-quick-crypto`](https://github.com/margelo/react-native-quick-crypto).

## Installation

```sh
npm install @codeserk/forge-stats
```

## Usage

### Module (singleton)

Initialise once at app startup, then call `track` anywhere without managing an instance.

```ts
import { init, track, trackView } from '@codeserk/forge-stats'

init({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

// track a single event - fire-and-forget
track({ type: 'View', name: '/home' })

// convenience shorthand for view events
trackView('/home', { referrer: document.referrer })
```

To send multiple events in one request, use `trackMany`:

```ts
import { trackMany } from '@codeserk/forge-stats'

trackMany({
  content: [
    { type: 'View', name: '/home' },
    { type: 'Click', name: 'cta-button', data: { label: 'Get started' } },
  ],
  meta: { referrer: document.referrer, userId: 'user_123' },
})
```

Use `sendEvent` / `sendEvents` if you need to await the result or handle errors yourself:

```ts
import { sendEvent, sendEvents } from '@codeserk/forge-stats'

await sendEvent({ type: 'View', name: '/home' })

await sendEvents({
  content: [{ type: 'View', name: '/home' }],
  meta: { referrer: document.referrer },
})
```

### Instance

```ts
import { Client } from '@codeserk/forge-stats'

const client = new Client({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

client.track({ type: 'View', name: '/home' })
client.trackView('/home', { referrer: document.referrer })
```

### Custom logger

By default errors are logged to `console`. Pass your own logger to override:

```ts
init({
  baseUrl: 'https://api-events.forge.codeserk.es',
  sdk: 'YOUR_SDK_KEY',
  logger: { error: (...args) => myLogger.error(...args) },
})
```

## API

### `init(options)`

Initialises the singleton client. Must be called before any send/track calls.

| Option    | Type     | Description                                     |
| --------- | -------- | ----------------------------------------------- |
| `baseUrl` | `string` | Base URL of the Forge Stats API                 |
| `sdk`     | `string` | Base64-encoded SDK key from the Forge dashboard |
| `logger`  | `Logger` | Optional. Defaults to `console`                 |

### `track(content, meta?)`

Fire-and-forget for a single event. Swallows errors and logs them via the logger.

### `trackMany(params)`

Fire-and-forget for multiple events in one request.

### `trackView(name, meta?)`

Convenience shorthand - equivalent to `track({ type: 'View', name }, meta)`.

### `sendEvent(content, meta?)`

Same as `track` but returns a `Promise` - use this when you need to await or catch errors.

### `sendEvents(params)`

Same as `trackMany` but returns a `Promise`.

### `getClient()`

Returns the singleton `Client` instance. Throws if `init()` has not been called.

### `EventMeta`

Optional metadata attached to any event or batch.

| Field                 | Type        | Description         |
| --------------------- | ----------- | ------------------- |
| `referrer`            | `string`    | Referring URL       |
| `userAgent`           | `string`    | User-Agent string   |
| `userId`              | `string`    | Application user ID |
| `userData`            | `EventData` | Arbitrary user data |
| `referrerUtmMedium`   | `string`    | UTM medium          |
| `referrerUtmSource`   | `string`    | UTM source          |
| `referrerUtmCampaign` | `string`    | UTM campaign        |
| `referrerUtmContent`  | `string`    | UTM content         |
| `referrerUtmTerm`     | `string`    | UTM term            |

### `EventContent`

| Field  | Type        | Required | Description                  |
| ------ | ----------- | -------- | ---------------------------- |
| `type` | `string`    | yes      | Event type, e.g. `'View'`    |
| `name` | `string`    | yes      | Event name, e.g. a page path |
| `data` | `EventData` | no       | Arbitrary key/value data     |

`EventData` is `Record<string, string | number | boolean>`.
