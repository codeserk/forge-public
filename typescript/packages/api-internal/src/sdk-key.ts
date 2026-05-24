import { KEY_SEPARATOR } from './const'

export interface DecodedSDKKey {
  token: string
  signingSecret: string
}

export function decodeSDKKey(sdkKey: string): DecodedSDKKey {
  const raw = atob(sdkKey)
  const idx = raw.indexOf(KEY_SEPARATOR)
  if (idx === -1) {
    throw new Error('invalid sdk key: separator not found')
  }
  const token = raw.slice(0, idx)
  const signingSecret = raw.slice(idx + KEY_SEPARATOR.length)
  if (!token || !signingSecret) {
    throw new Error('invalid sdk key: empty token or signing secret')
  }
  return { token, signingSecret }
}
