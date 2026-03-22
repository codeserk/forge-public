/** A single piece of content to track in an event. */
export interface EventContent {
  /** Event type, e.g. `'View'`. */
  readonly type: string
  /** Event name, e.g. the page path. */
  readonly name: string
}

/** Parameters for {@link Client.sendEvent}. */
export interface SendEventParams {
  readonly content: EventContent[]
  readonly referrer?: string
}

/** Minimal logger interface accepted by the SDK. */
export interface Logger {
  error(...args: unknown[]): void
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
