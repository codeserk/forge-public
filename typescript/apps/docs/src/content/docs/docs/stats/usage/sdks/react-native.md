---
title: React Native SDK
description: Track events from React Native with the crypto.subtle polyfill handled automatically.
---

Wraps [`@codeserk/forge-stats`](/docs/stats/usage/sdks/typescript) with a `crypto.subtle` polyfill applied at import time. The full SDK API is re-exported - no extra setup needed.

## Installation

```sh
npm install @codeserk/forge-stats-react-native react-native-quick-crypto
```

Then for iOS:

```sh
cd ios && pod install
```

## Usage

Import from this package instead of `@codeserk/forge-stats`. The polyfill is applied automatically.

```ts
import { init, track, trackView } from '@codeserk/forge-stats-react-native'

init({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

trackView('HomeScreen')
```

All functions and types from `@codeserk/forge-stats` are available - see the [TypeScript SDK](/docs/stats/usage/sdks/typescript) for the full API reference.
