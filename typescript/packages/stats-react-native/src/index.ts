import { Client as BaseClient, type ClientOptions, init as baseInit } from '@codeserk/forge-stats'

import { reactNativeSignHash } from './signature'

export { reactNativeSignHash } from './signature'
export * from '@codeserk/forge-stats'

/** Client with React Native compatible signing by default. */
export class Client extends BaseClient {
  /** @param options client configuration */
  constructor(options: ClientOptions) {
    super({ signHashFn: reactNativeSignHash, ...options })
  }
}

/**
 * Initializes the singleton client with React Native compatible signing by default.
 * @param options client configuration
 */
export function init(options: ClientOptions): void {
  baseInit({ signHashFn: reactNativeSignHash, ...options })
}
