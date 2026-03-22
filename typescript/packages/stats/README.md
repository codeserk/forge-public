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
import { init, track } from '@codeserk/forge-stats'

init({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

// fire-and-forget
track({ content: [{ type: 'View', name: '/home' }], referrer: document.referrer })
```

Use `sendEvent` if you need to await the result or handle errors yourself:

```ts
import { sendEvent } from '@codeserk/forge-stats'

await sendEvent({ content: [{ type: 'View', name: '/home' }] })
```

### Instance

```ts
import { Client } from '@codeserk/forge-stats'

const client = new Client({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

client.track({ content: [{ type: 'View', name: '/home' }] })
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

Initialises the singleton client. Must be called before `track` or `sendEvent`.

| Option    | Type     | Description                                     |
| --------- | -------- | ----------------------------------------------- |
| `baseUrl` | `string` | Base URL of the Forge Stats API                 |
| `sdk`     | `string` | Base64-encoded SDK key from the Forge dashboard |
| `logger`  | `Logger` | Optional. Defaults to `console`                 |

### `track(params)`

Fire-and-forget event. Swallows errors and logs them via the logger.

### `sendEvent(params)`

Same as `track` but returns a `Promise` — useful when you need to await or catch errors.

### `getClient()`

Returns the singleton `Client` instance. Throws if `init()` has not been called.
