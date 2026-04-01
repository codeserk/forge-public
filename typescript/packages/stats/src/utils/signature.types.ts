/** Function that computes an HMAC-SHA256 and returns the result as a Base64 string. */
export type SignHashFn = (content: string, secret: string) => Promise<string>
