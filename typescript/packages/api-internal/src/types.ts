export type SignHashFn = (content: string, secret: string) => Promise<string>

export interface ClientOptions {
  /** Base URL of the api-internal server, no trailing slash. */
  baseUrl?: string
  /** The base64-encoded sdk key returned by the dashboard when the PAT was created. */
  sdkKey: string
  /** HMAC-SHA256 implementation. Defaults to Web Crypto when available. */
  signHashFn?: SignHashFn
}
