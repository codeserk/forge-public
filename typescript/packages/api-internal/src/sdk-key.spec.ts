import { decodeSDKKey } from './sdk-key'

const KEY = (token: string, secret: string) => btoa(`${token}___${secret}`)

describe('decodeSDKKey', () => {
  it('should split a valid sdk key into token and signing secret', () => {
    const sdk = KEY('fg_abcdef', 'super-secret')
    expect(decodeSDKKey(sdk)).toEqual({ token: 'fg_abcdef', signingSecret: 'super-secret' })
  })

  it('should throw when separator is missing', () => {
    const bad = btoa('justatoken')
    expect(() => decodeSDKKey(bad)).toThrow(/separator/)
  })

  it('should throw when token half is empty', () => {
    const bad = btoa('___secret-only')
    expect(() => decodeSDKKey(bad)).toThrow(/empty/)
  })

  it('should throw when signing secret half is empty', () => {
    const bad = btoa('fg_token___')
    expect(() => decodeSDKKey(bad)).toThrow(/empty/)
  })
})
