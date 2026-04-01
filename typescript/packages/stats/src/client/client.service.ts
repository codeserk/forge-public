import { generateFingerprint } from '../errors/error'
import { SignatureBuilder } from '../utils/signature'
import { SignHashFn } from '../utils/signature.types'
import { EVENTS_PATH, KEY_SEPARATOR, SIGNATURE_APP } from './client.const'
import type {
  ClientOptions,
  ErrorEventOptions,
  EventContent,
  EventMeta,
  Logger,
  SendEventParams,
} from './client.types'

/** Client for sending analytics events to the Forge Stats API. */
export class Client {
  private readonly baseUrl: string
  private readonly token: string
  private readonly signatureSecret: string
  private readonly logger: Logger
  private readonly signHashFn?: SignHashFn

  constructor({ baseUrl, sdk, logger = console, signHashFn }: ClientOptions) {
    this.baseUrl = baseUrl
    this.logger = logger
    this.signHashFn = signHashFn

    const key = atob(sdk)
    const parts = key.split(KEY_SEPARATOR)
    this.token = parts[0]!
    this.signatureSecret = parts[1]!
  }

  /**
   * Sends one or more tracking events to the API.
   * @param params Event payload
   */
  async sendEvents({ content, meta }: SendEventParams): Promise<void> {
    const body = {
      timestamp: meta?.timestamp,
      timestampEnd: meta?.timestampEnd,
      userID: meta?.userId,
      userIp: meta?.userIp,
      userAgent: meta?.userAgent,
      userType: meta?.userType,
      userData: meta?.userData,
      userCountry: meta?.userCountry,
      userRegion: meta?.userRegion,
      userCity: meta?.userCity,
      deviceType: meta?.deviceType,
      deviceOS: meta?.deviceOS,
      deviceOSVersion: meta?.deviceOSVersion,
      deviceBrowser: meta?.deviceBrowser,
      appName: meta?.appName,
      appVersionName: meta?.appVersionName,
      appVersionID: meta?.appVersionID,
      referrer: meta?.referrer,
      referrerEvent: meta?.referrerEvent,
      referrerUtmMedium: meta?.referrerUtmMedium,
      referrerUtmSource: meta?.referrerUtmSource,
      referrerUtmCampaign: meta?.referrerUtmCampaign,
      referrerUtmContent: meta?.referrerUtmContent,
      referrerUtmTerm: meta?.referrerUtmTerm,
      content: content,
    }

    await fetch(`${this.baseUrl}${EVENTS_PATH}`, {
      method: 'POST',
      headers: await this.buildHeaders(EVENTS_PATH, body),
      body: JSON.stringify(body),
    })
  }

  /**
   * Sends a single tracking event to the API.
   * @param content Single event content
   * @param meta Optional metadata
   */
  async sendEvent(content: EventContent, meta?: EventMeta): Promise<void> {
    return this.sendEvents({ content: [content], meta })
  }

  /**
   * Fire-and-forget wrapper around {@link sendEvents}. Logs errors instead of throwing.
   * @param params Event payload
   */
  trackMany(params: SendEventParams): void {
    this.sendEvents(params).catch((error) =>
      this.logger.error('[forge-stats] Failed to send event', error),
    )
  }

  /**
   * Fire-and-forget for a single event. Logs errors instead of throwing.
   * @param content Single event content
   * @param meta Optional metadata
   */
  track(content: EventContent, meta?: EventMeta): void {
    this.sendEvent(content, meta).catch((error) =>
      this.logger.error('[forge-stats] Failed to send event', error),
    )
  }

  /**
   * Convenience method to track a single View event.
   * @param name Page path or view name
   * @param meta Optional metadata
   */
  trackView(name: string, meta?: EventMeta): void {
    this.track({ type: 'View', name }, meta)
  }

  /**
   * Sends an error event to the API.
   * @param error The error to report
   * @param options Error event options
   * @param meta Optional metadata
   */
  async sendError(error: Error, options?: ErrorEventOptions, meta?: EventMeta): Promise<void> {
    return this.sendEvent(this.buildErrorContent(error, options), meta)
  }

  /**
   * Fire-and-forget error tracking. Logs errors instead of throwing.
   * @param error The error to report
   * @param options Error event options
   * @param meta Optional metadata
   */
  trackError(error: Error, options?: ErrorEventOptions, meta?: EventMeta): void {
    this.sendError(error, options, meta).catch((sendErr) =>
      this.logger.error('[forge-stats] Failed to send error event', sendErr),
    )
  }

  /**
   * Builds an event content object from an error.
   * @param error The error to convert
   * @param options Error event options
   * @return Event content with fingerprint and error data
   */
  private buildErrorContent(error: Error, options?: ErrorEventOptions): EventContent {
    const fingerprint = generateFingerprint(error, { maxFrames: options?.maxFrames })

    const name = (error.name || error.message || 'Error').slice(0, 15)

    return {
      type: 'Error',
      name,
      bucket: fingerprint,
      data: {
        ...options?.data,
        message: error.message || '',
        errorType: error.name || 'Error',
        stack: error.stack || '',
        fingerprint: fingerprint,
        handled: options?.handled ?? true,
      },
    }
  }

  /**
   * Builds signed request headers for the given path and body.
   * @param path API path used in the signature
   * @param body Request body used in the signature
   * @return Signed headers object
   */
  private async buildHeaders(path: string, body: string | object): Promise<Record<string, string>> {
    return {
      'Content-Type': 'application/json',
      'x-token': this.token,
      'x-signature-app': SIGNATURE_APP,
      'x-signature': await new SignatureBuilder(this.signatureSecret, this.signHashFn)
        .withUrl(path)
        .withBody(body)
        .build(),
    }
  }
}
