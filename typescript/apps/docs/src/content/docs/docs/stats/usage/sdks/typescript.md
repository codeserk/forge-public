---
title: TypeScript SDK
description: Track events from Node.js, browser, or React Native using the TypeScript SDK.
---

If you are building something with TypeScript (or plain JS), this is your go-to. Works in Node.js, browser, and React Native - though React Native needs a small polyfill (more on that below).

## Installation

```sh
npm install @codeserk/forge-stats
```

## Usage

### Singleton (recommended)

The easiest way to get started. Initialize once - usually at app startup - and call `track` from anywhere without passing a client around.

```ts
import { init, track } from '@codeserk/forge-stats'

init({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

// fire-and-forget - errors are swallowed and logged
track({ content: [{ type: 'View', name: '/home' }], referrer: document.referrer })
```

If you need to await the result or handle errors yourself, use `sendEvent` instead:

```ts
import { sendEvent } from '@codeserk/forge-stats'

await sendEvent({ content: [{ type: 'View', name: '/home' }] })
```

### Instance

Prefer to manage the client yourself? Fair enough.

```ts
import { Client } from '@codeserk/forge-stats'

const client = new Client({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

client.track({ content: [{ type: 'View', name: '/home' }] })
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

Initializes the singleton. Call this before `track` or `sendEvent`.

| Option    | Type     | Required | Description                                     |
| --------- | -------- | -------- | ----------------------------------------------- |
| `baseUrl` | `string` | yes      | Base URL of the Forge Stats API                 |
| `sdk`     | `string` | yes      | Base64-encoded SDK key from the Forge dashboard |
| `logger`  | `Logger` | no       | Defaults to `console`                           |

### `track(params)`

Fire-and-forget. Swallows errors and logs them via the logger.

### `sendEvent(params)`

Same as `track` but returns a `Promise` - use this when you need to await or catch errors.

### `getClient()`

Returns the singleton `Client` instance. Throws if `init()` has not been called yet.
