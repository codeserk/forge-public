export type EventData = Record<string, string | number | boolean>

/** A single piece of content to track in an event. */
export interface EventContent {
  /** Event type. @example 'View' */
  readonly type: string
  /** Event name. @example '/home' */
  readonly name: string
  /** Optional bucket for grouping. */
  readonly bucket?: string
  /** Trace ID for distributed tracing. @example 'trace123' */
  readonly traceID?: string
  /** Span ID for distributed tracing. @example 'span456' */
  readonly spanID?: string
  /** Parent span ID for distributed tracing. @example 'parent789' */
  readonly parentSpanID?: string
  /** Arbitrary key/value data attached to this content item. */
  readonly data?: EventData
}

/** Optional metadata sent alongside the event payload. */
export interface EventMeta {
  /** ISO 8601 timestamp. Defaults to now on the server. @example '2023-10-01T12:34:56Z' */
  readonly timestamp?: string
  /** ISO 8601 end timestamp for duration events. @example '2023-10-01T13:35:56Z' */
  readonly timestampEnd?: string
  /** Application-level user identifier. @example 'user123' */
  readonly userId?: string
  /** Client IP override (server resolved by default). @example '192.168.1.1' */
  readonly userIp?: string
  /** User-Agent string. @example 'Mozilla/5.0' */
  readonly userAgent?: string
  /** User type. @example 'premium' */
  readonly userType?: string
  /** Arbitrary key/value data attached to the user. */
  readonly userData?: EventData
  /** User country code. @example 'US' */
  readonly userCountry?: string
  /** User region. @example 'California' */
  readonly userRegion?: string
  /** User city. @example 'San Francisco' */
  readonly userCity?: string
  /** Device type. @example 'mobile' */
  readonly deviceType?: string
  /** Device OS. @example 'iOS' */
  readonly deviceOS?: string
  /** Device OS version. @example '17.4.1' */
  readonly deviceOSVersion?: string
  /** Device browser. @example 'Safari' */
  readonly deviceBrowser?: string
  /** Application name. @example 'MyApp' */
  readonly appName?: string
  /** Application version name. @example '2.3.1' */
  readonly appVersionName?: string
  /** Application version ID / build number. @example '42' */
  readonly appVersionID?: string
  /** Referring URL. @example 'https://example.com' */
  readonly referrer?: string
  /** Referrer event. @example 'click' */
  readonly referrerEvent?: string
  /** UTM medium. @example 'email' */
  readonly referrerUtmMedium?: string
  /** UTM source. @example 'newsletter' */
  readonly referrerUtmSource?: string
  /** UTM campaign. @example 'campaign123' */
  readonly referrerUtmCampaign?: string
  /** UTM content. @example 'content123' */
  readonly referrerUtmContent?: string
  /** UTM term. @example 'term123' */
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
  /** Base URL of the Forge Stats API. @default 'https://api-events.forge.codeserk.es' */
  readonly baseUrl?: string
  /** Base64-encoded SDK key from the Forge dashboard. Encodes the project token and HMAC secret. */
  readonly sdk: string
  /** Defaults to `console`. */
  readonly logger?: Logger
  /** Custom hash function for signing. Defaults to Web Crypto HMAC-SHA256. */
  readonly signHashFn?: (content: string, secret: string) => Promise<string>
}
