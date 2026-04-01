import {
  Client as BaseClient,
  type ClientOptions,
  getClient,
  init as baseInit,
} from '@codeserk/forge-stats'
import { Platform } from 'react-native'

import { reactNativeSignHash } from './signature'

export { reactNativeSignHash } from './signature'
export * from '@codeserk/forge-stats'

function detectMeta() {
  return {
    deviceOS: Platform.OS,
    deviceOSVersion: String(Platform.Version),
  }
}

/** Client with React Native compatible signing and platform meta by default. */
export class Client extends BaseClient {
  /** @param options client configuration */
  constructor(options: ClientOptions) {
    super({ signHashFn: reactNativeSignHash, ...options })
    this.updateMeta(detectMeta())
  }
}

/**
 * Initializes the singleton client with React Native compatible signing and platform meta.
 * @param options client configuration
 */
export function init(options: ClientOptions): void {
  baseInit({ signHashFn: reactNativeSignHash, ...options })
  getClient().updateMeta(detectMeta())
}
