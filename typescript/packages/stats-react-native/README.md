# @codeserk/forge-stats-react-native

React Native wrapper for [Forge Stats](https://github.com/codeserk/forge-public). Ships a pure-JS signing implementation (`js-sha256`) so no native crypto modules are needed.

## Installation

```sh
npm install @codeserk/forge-stats-react-native
```

## Usage

Import from this package instead of `@codeserk/forge-stats`. The `init` and `Client` exports automatically use the React Native compatible hash function - nothing else needed.

```ts
import { init, track, trackView } from '@codeserk/forge-stats-react-native'

init({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

trackView('HomeScreen')
```

### Using `Client` directly

```ts
import { Client } from '@codeserk/forge-stats-react-native'

const client = new Client({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

client.trackView('HomeScreen')
```

All exports from `@codeserk/forge-stats` are available - see the [TypeScript SDK docs](https://forge.codeserk.es/docs/stats/usage/sdks/typescript) for the full API reference.
