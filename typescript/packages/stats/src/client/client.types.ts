export type EventData = Record<string, string | number | boolean>

/** A single piece of content to track in an event. */
export interface EventContent {
  /** Event type, e.g. `'View'`. */
  readonly type: string
  /** Event name, e.g. the page path. */
  readonly name: string
  /** Arbitrary key/value data attached to this content item. */
  readonly data?: EventData
}

/** Optional metadata sent alongside the event payload. */
export interface EventMeta {
  /** Referring URL. */
  readonly referrer?: string
  /** User-Agent string. */
  readonly userAgent?: string
  /** Application-level user identifier. */
  readonly userId?: string
  /** Arbitrary key/value data attached to the user. */
  readonly userData?: EventData
  /** UTM medium. */
  readonly referrerUtmMedium?: string
  /** UTM source. */
  readonly referrerUtmSource?: string
  /** UTM campaign. */
  readonly referrerUtmCampaign?: string
  /** UTM content. */
  readonly referrerUtmContent?: string
  /** UTM term. */
  readonly referrerUtmTerm?: string
}

/** Parameters for {@link Client.sendEvent}. */
export interface SendEventParams {
  readonly content: EventContent[]
  readonly meta?: EventMeta
}

/** Minimal logger interface accepted by the SDK. */
export interface Logger {
  error(...args: unknown[]): void
}

/** Options for tracking an error event. */
export interface ErrorEventOptions {
  /** Whether the error was caught by user code. @default true */
  readonly handled?: boolean
  /** Extra key/value data attached to the error event. */
  readonly data?: EventData
  /** Number of top stack frames used for fingerprinting. @default 3 */
  readonly maxFrames?: number
}

/** Options used to initialise a {@link Client} instance. */
export interface ClientOptions {
  /** Base URL of the Forge Stats API, e.g. `'https://api-events.forge.codeserk.es'`. */
  readonly baseUrl: string
  /** Base64-encoded SDK key from the Forge dashboard. Encodes the project token and HMAC secret. */
  readonly sdk: string
  /** Defaults to `console`. */
  readonly logger?: Logger
}
