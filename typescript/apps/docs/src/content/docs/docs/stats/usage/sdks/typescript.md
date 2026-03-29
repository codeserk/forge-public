---
title: TypeScript SDK
description: Track events from Node.js, browser, or React Native using the TypeScript SDK.
---

If you are building something with TypeScript (or plain JS), _this is your go-to_. Works in Node.js, browser, and React Native - though React Native needs a small polyfill (more on that below).

## Installation

```sh
npm install @codeserk/forge-stats
```

## Usage

### Singleton (recommended)

The easiest way to get started. Initialize once - _usually at app startup_ - and call `track` from anywhere **without passing a client around**.

```ts
import { init, track, trackView } from '@codeserk/forge-stats'

init({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

// track a single event - fire-and-forget, errors are logged
track({ type: 'View', name: '/home' })

// convenience shorthand for view events
trackView('/home', { referrer: document.referrer })
```

To track multiple events in one request, use `trackMany`:

```ts
import { trackMany } from '@codeserk/forge-stats'

trackMany({
  content: [
    { type: 'View', name: '/home' },
    { type: 'Click', name: 'cta-button', data: { label: 'Get started' } },
  ],
  meta: { referrer: document.referrer },
})
```

If you need to await the result or handle errors yourself, use `sendEvent` / `sendEvents`:

```ts
import { sendEvent, sendEvents } from '@codeserk/forge-stats'

await sendEvent({ type: 'View', name: '/home' })

await sendEvents({
  content: [{ type: 'View', name: '/home' }],
  meta: { referrer: document.referrer, userId: 'user_123' },
})
```

### Instance

Prefer to manage the client yourself? Fair enough.

```ts
import { Client } from '@codeserk/forge-stats'

const client = new Client({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

client.track({ type: 'View', name: '/home' })
client.trackView('/home', { referrer: document.referrer })
```

### Custom logger

By default, errors go to `console`. Pass your own logger if you want them somewhere else:

```ts
init({
  baseUrl: 'https://api-events.forge.codeserk.es',
  sdk: 'YOUR_SDK_KEY',
  logger: { error: (...args) => myLogger.error(...args) },
})
```

## React Native

You will need a `crypto.subtle` polyfill - [`react-native-quick-crypto`](https://github.com/margelo/react-native-quick-crypto) works well for this.

## API reference

### `init(options)`

Initializes the singleton. Call this before any send/track calls.

| Option    | Type     | Required | Description                                     |
| --------- | -------- | -------- | ----------------------------------------------- |
| `baseUrl` | `string` | yes      | Base URL of the Forge Stats API                 |
| `sdk`     | `string` | yes      | Base64-encoded SDK key from the Forge dashboard |
| `logger`  | `Logger` | no       | Defaults to `console`                           |

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

Returns the singleton `Client` instance. **Throws if `init()` has not been called yet.**

### `EventMeta`

Optional metadata that can be attached to any event.

| Field                | Type                  | Description          |
| -------------------- | --------------------- | -------------------- |
| `referrer`           | `string`              | Referring URL        |
| `userAgent`          | `string`              | User-Agent string    |
| `userId`             | `string`              | Application user ID  |
| `userData`           | `EventData`           | Arbitrary user data  |
| `referrerUtmMedium`  | `string`              | UTM medium           |
| `referrerUtmSource`  | `string`              | UTM source           |
| `referrerUtmCampaign`| `string`              | UTM campaign         |
| `referrerUtmContent` | `string`              | UTM content          |
| `referrerUtmTerm`    | `string`              | UTM term             |

### `EventContent`

| Field  | Type        | Required | Description                         |
| ------ | ----------- | -------- | ----------------------------------- |
| `type` | `string`    | yes      | Event type, e.g. `'View'`           |
| `name` | `string`    | yes      | Event name, e.g. a page path        |
| `data` | `EventData` | no       | Arbitrary key/value data            |

`EventData` is `Record<string, string | number | boolean>`.
