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
  private defaultMeta: EventMeta = {}

  /** @param options client configuration */
  constructor({ baseUrl, sdk, logger = console, signHashFn }: ClientOptions) {
    this.baseUrl = baseUrl
    this.logger = logger
    this.signHashFn = signHashFn

    const key = atob(sdk)
    const parts = key.split(KEY_SEPARATOR)
    this.token = parts[0]!
    this.signatureSecret = parts[1]!

    this.defaultMeta = this.detectMeta()
  }

  /**
   * Sets default metadata merged into every request. Per-call meta takes precedence.
   * @param meta default metadata
   */
  setMeta(meta: EventMeta): void {
    this.defaultMeta = meta
  }

  /**
   * Merges new metadata into the existing default metadata.
   * @param meta metadata to merge
   */
  updateMeta(meta: EventMeta): void {
    this.defaultMeta = { ...this.defaultMeta, ...meta }
  }

  /**
   * Sends one or more tracking events to the API.
   * @param params event payload
   */
  async sendEvents({ content, meta }: SendEventParams): Promise<void> {
    const m = { ...this.defaultMeta, ...meta }
    const body = {
      timestamp: m.timestamp,
      timestampEnd: m.timestampEnd,
      userID: m.userId,
      userIp: m.userIp,
      userAgent: m.userAgent,
      userType: m.userType,
      userData: m.userData,
      userCountry: m.userCountry,
      userRegion: m.userRegion,
      userCity: m.userCity,
      deviceType: m.deviceType,
      deviceOS: m.deviceOS,
      deviceOSVersion: m.deviceOSVersion,
      deviceBrowser: m.deviceBrowser,
      appName: m.appName,
      appVersionName: m.appVersionName,
      appVersionID: m.appVersionID,
      referrer: m.referrer,
      referrerEvent: m.referrerEvent,
      referrerUtmMedium: m.referrerUtmMedium,
      referrerUtmSource: m.referrerUtmSource,
      referrerUtmCampaign: m.referrerUtmCampaign,
      referrerUtmContent: m.referrerUtmContent,
      referrerUtmTerm: m.referrerUtmTerm,
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
   * @param content single event content
   * @param meta optional metadata
   */
  async sendEvent(content: EventContent, meta?: EventMeta): Promise<void> {
    return this.sendEvents({ content: [content], meta })
  }

  /**
   * Fire-and-forget wrapper around {@link sendEvents}. Logs errors instead of throwing.
   * @param params event payload
   */
  trackMany(params: SendEventParams): void {
    this.sendEvents(params).catch((error) =>
      this.logger.error('[forge-stats] Failed to send event', error),
    )
  }

  /**
   * Fire-and-forget for a single event. Logs errors instead of throwing.
   * @param content single event content
   * @param meta optional metadata
   */
  track(content: EventContent, meta?: EventMeta): void {
    this.sendEvent(content, meta).catch((error) =>
      this.logger.error('[forge-stats] Failed to send event', error),
    )
  }

  /**
   * Convenience method to track a single View event.
   * @param name page path or view name
   * @param meta optional metadata
   */
  trackView(name: string, meta?: EventMeta): void {
    this.track({ type: 'View', name }, meta)
  }

  /**
   * Sends an error event to the API.
   * @param error the error to report
   * @param options error event options
   * @param meta optional metadata
   */
  async sendError(error: Error, options?: ErrorEventOptions, meta?: EventMeta): Promise<void> {
    return this.sendEvent(this.buildErrorContent(error, options), meta)
  }

  /**
   * Fire-and-forget error tracking. Logs errors instead of throwing.
   * @param error the error to report
   * @param options error event options
   * @param meta optional metadata
   */
  trackError(error: Error, options?: ErrorEventOptions, meta?: EventMeta): void {
    this.sendError(error, options, meta).catch((sendErr) =>
      this.logger.error('[forge-stats] Failed to send error event', sendErr),
    )
  }

  /**
   * Builds an event content object from an error.
   * @param error the error to convert
   * @param options error event options
   * @returns event content with fingerprint and error data
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
   * @param body request body used in the signature
   * @returns signed headers object
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

  /** Detects browser metadata (referrer, userAgent) when available. */
  private detectMeta(): EventMeta {
    if (typeof window === 'undefined') {
      return {}
    }

    return {
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent || undefined : undefined,
    }
  }
}
