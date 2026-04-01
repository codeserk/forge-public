import type { SignHashFn } from '@codeserk/forge-stats'
import { sha256 } from 'js-sha256'

/**
 * HMAC-SHA256 implementation using js-sha256, compatible with React Native.
 * @param content the content to sign
 * @param secret the HMAC secret
 * @returns Base64-encoded signature
 */
export const reactNativeSignHash: SignHashFn = async (
  content: string,
  secret: string,
): Promise<string> => {
  const hmac = sha256.hmac(secret, content)
  const bytes = new Uint8Array(hmac.match(/.{2}/g)!.map((byte) => parseInt(byte, 16)))

  return btoa(String.fromCharCode.apply(null, Array.from(bytes)))
}
