# @codeserk/forge-stats-react-native

React Native wrapper for [Forge Stats](https://github.com/codeserk/forge-public). Installs the `crypto.subtle` polyfill automatically and re-exports the full SDK.

## Installation

```sh
npm install @codeserk/forge-stats-react-native react-native-quick-crypto
```

Then run pod install for iOS:

```sh
cd ios && pod install
```

## Usage

Import from this package instead of `@codeserk/forge-stats`. The polyfill is applied at import time - nothing else needed.

```ts
import { init, track, trackView } from '@codeserk/forge-stats-react-native'

init({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

trackView('HomeScreen')
```

All exports from `@codeserk/forge-stats` are available - see the [TypeScript SDK docs](https://forge.codeserk.es/docs/stats/usage/sdks/typescript) for the full API reference.
