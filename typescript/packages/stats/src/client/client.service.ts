import { SignatureBuilder } from '../utils/signature'
import { EVENTS_PATH, KEY_SEPARATOR, SIGNATURE_APP } from './client.const'
import type { ClientOptions, Logger, SendEventParams } from './client.types'

/** Client for sending analytics events to the Forge Stats API. */
export class Client {
  private readonly baseUrl: string
  private readonly token: string
  private readonly signatureSecret: string
  private readonly logger: Logger

  constructor({ baseUrl, sdk, logger = console }: ClientOptions) {
    this.baseUrl = baseUrl
    this.logger = logger

    const key = atob(sdk)
    const parts = key.split(KEY_SEPARATOR)
    this.token = parts[0]!
    this.signatureSecret = parts[1]!
  }

  /**
   * Sends a tracking event to the API.
   * @param params Event payload.
   * @returns Promise that resolves when the request completes.
   */
  async sendEvent({ content, referrer }: SendEventParams): Promise<void> {
    const body = { referrer, Content: content }

    await fetch(`${this.baseUrl}${EVENTS_PATH}`, {
      method: 'POST',
      headers: await this.buildHeaders(EVENTS_PATH, body),
      body: JSON.stringify(body),
    })
  }

  /**
   * Fire-and-forget wrapper around {@link sendEvent}. Logs errors instead of throwing.
   * @param params Event payload.
   */
  track(params: SendEventParams): void {
    this.sendEvent(params).catch((error) =>
      this.logger.error('[forge-stats] Failed to send event', error),
    )
  }

  /**
   * Builds signed request headers for the given path and body.
   * @param path API path used in the signature.
   * @param body Request body used in the signature.
   * @returns Signed headers object.
   */
  private async buildHeaders(path: string, body: string | object): Promise<Record<string, string>> {
    return {
      'Content-Type': 'application/json',
      'x-token': this.token,
      'x-signature-app': SIGNATURE_APP,
      'x-signature': await new SignatureBuilder(this.signatureSecret)
        .withUrl(path)
        .withBody(body)
        .build(),
    }
  }
}
