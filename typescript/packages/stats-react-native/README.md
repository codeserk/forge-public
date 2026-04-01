# @codeserk/forge-stats-react-native

React Native wrapper for [Forge Stats](https://github.com/codeserk/forge-public). Ships a pure-JS signing implementation (`js-sha256`) so no native crypto modules are needed.

## Installation

```sh
npm install @codeserk/forge-stats-react-native
```

## Usage

Import from this package instead of `@codeserk/forge-stats`. The `init` and `Client` exports automatically use the React Native compatible hash function and set `deviceOS` and `deviceOSVersion` from `Platform` - nothing else needed.

```ts
import { init, trackView, updateMeta } from '@codeserk/forge-stats-react-native'

init({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })
// deviceOS and deviceOSVersion are already set automatically

// add app metadata
updateMeta({ appName: 'MyApp', appVersionName: '2.3.1' })

// update later (e.g. after login)
updateMeta({ userId: 'user_123' })

trackView('HomeScreen')
```

### Error tracking

```ts
import { trackError, captureGlobalErrors } from '@codeserk/forge-stats-react-native'

// capture all uncaught errors (uses React Native's ErrorUtils)
captureGlobalErrors()

// or track manually
trackError(new Error('Something went wrong'), { handled: true })
```

### Using `Client` directly

```ts
import { Client } from '@codeserk/forge-stats-react-native'

const client = new Client({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

client.setMeta({ appName: 'MyApp' })
client.trackView('HomeScreen')
```

All exports from `@codeserk/forge-stats` are available - see the [TypeScript SDK docs](https://forge.codeserk.es/docs/stats/usage/sdks/typescript) for the full API reference.
