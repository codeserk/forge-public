import QuickCrypto from 'react-native-quick-crypto'

// @ts-expect-error - polyfill crypto.subtle for React Native
global.crypto = QuickCrypto.webcrypto

export * from '@codeserk/forge-stats'
