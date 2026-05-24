import type { SignHashFn } from './types'

/** Default HMAC-SHA256 using Web Crypto. Works in browsers and Node 18+. */
export async function webCryptoHmacSha256(content: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(content))

  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(signature))))
}

export class SignatureBuilder {
  private parts: string[] = []

  constructor(
    private readonly secret: string,
    private readonly signHashFn: SignHashFn = webCryptoHmacSha256,
  ) {}

  withUrl(url: string): SignatureBuilder {
    this.parts.push(url)
    return this
  }

  withBody(body: string | object | undefined): SignatureBuilder {
    const bodyString =
      typeof body === 'string' ? (body ?? '') : JSON.stringify(body ?? {})
    this.parts.push(btoa(bodyString))
    return this
  }

  async build(timeString?: string): Promise<string> {
    let timePart = timeString
    if (!timePart) {
      const now = new Date()
      now.setSeconds(0)
      now.setMilliseconds(0)
      timePart = now.toISOString()
    }
    const content = btoa([...this.parts, timePart].join('_').trim())

    return this.signHashFn(content, this.secret)
  }
}
