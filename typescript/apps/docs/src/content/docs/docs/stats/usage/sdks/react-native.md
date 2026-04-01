---
title: React Native SDK
description: Track events from React Native with a pure-JS signing implementation - no native crypto modules needed.
---

Wraps [`@codeserk/forge-stats`](/docs/stats/usage/sdks/typescript) with a pure-JS HMAC-SHA256 implementation (`js-sha256`). The full SDK API is re-exported with `init` and `Client` defaulting to the React Native compatible hash function. `deviceOS` and `deviceOSVersion` are automatically detected from `Platform` - no extra setup needed.

## Installation

```sh
npm install @codeserk/forge-stats-react-native
```

No native modules, no pod install required.

## Usage

Import from this package instead of `@codeserk/forge-stats`:

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

### Default metadata

`deviceOS` and `deviceOSVersion` are set automatically from `Platform`. Use `updateMeta` to merge additional metadata or `setMeta` to replace all defaults. Per-call metadata takes precedence.

```ts
// add app info at startup
updateMeta({ appName: 'MyApp', appVersionName: '2.3.1' })

// merge user info after login
updateMeta({ userId: user.id, userType: user.plan })
```

### Error tracking

```ts
import { trackError, captureGlobalErrors } from '@codeserk/forge-stats-react-native'

// capture all uncaught errors (uses React Native's ErrorUtils)
captureGlobalErrors()

// or track manually
trackError(new Error('Something went wrong'))

// with options
trackError(new Error('Oops'), { handled: true, data: { screen: 'Checkout' } })
```

### Using `Client` directly

```ts
import { Client } from '@codeserk/forge-stats-react-native'

const client = new Client({ baseUrl: 'https://api-events.forge.codeserk.es', sdk: 'YOUR_SDK_KEY' })

client.setMeta({ appName: 'MyApp' })
client.trackView('HomeScreen')
client.trackError(new Error('Oops'))
```

All functions and types from `@codeserk/forge-stats` are available - see the [TypeScript SDK](/docs/stats/usage/sdks/typescript) for the full API reference.
