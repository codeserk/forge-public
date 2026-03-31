import { captureErrors as captureErrors } from '../errors/capture'
import { Client } from './client.service'
import type {
  ClientOptions,
  ErrorEventOptions,
  EventContent,
  EventMeta,
  SendEventParams,
} from './client.types'

let instance: Client | undefined

/**
 * Initializes the singleton client. Must be called before any send/track calls.
 * @param options Client configuration
 */
export function init(options: ClientOptions): void {
  instance = new Client(options)
}

/**
 * Returns the singleton client, throwing if {@link init} has not been called.
 * @return Singleton client instance
 */
export function getClient(): Client {
  if (!instance) {
    throw new Error('Forge Stats is not initialised. Call init() first.')
  }
  return instance
}

/**
 * Sends one or more tracking events using the singleton client.
 * @param params Event payload
 */
export async function sendEvents(params: SendEventParams): Promise<void> {
  return getClient().sendEvents(params)
}

/**
 * Sends a single tracking event using the singleton client.
 * @param content Single event content
 * @param meta Optional metadata
 */
export async function sendEvent(content: EventContent, meta?: EventMeta): Promise<void> {
  return getClient().sendEvent(content, meta)
}

/**
 * Fire-and-forget wrapper around {@link sendEvents}. Logs errors instead of throwing.
 * @param params Event payload
 */
export function trackMany(params: SendEventParams): void {
  getClient().trackMany(params)
}

/**
 * Fire-and-forget for a single event. Logs errors instead of throwing.
 * @param content Single event content
 * @param meta Optional metadata
 */
export function track(content: EventContent, meta?: EventMeta): void {
  getClient().track(content, meta)
}

/**
 * Convenience method to track a single View event.
 * @param name Page path or view name
 * @param meta Optional metadata
 */
export function trackView(name: string, meta?: EventMeta): void {
  getClient().trackView(name, meta)
}

/**
 * Sends an error event using the singleton client.
 * @param error The error to report
 * @param options Error event options
 * @param meta Optional metadata
 */
export async function sendError(
  error: Error,
  options?: ErrorEventOptions,
  meta?: EventMeta,
): Promise<void> {
  return getClient().sendError(error, options, meta)
}

/**
 * Fire-and-forget error tracking. Logs errors instead of throwing.
 * @param error The error to report
 * @param options Error event options
 * @param meta Optional metadata
 */
export function trackError(error: Error, options?: ErrorEventOptions, meta?: EventMeta): void {
  getClient().trackError(error, options, meta)
}

/**
 * Registers global error handlers for the current environment.
 * Supports browser, Node.js, and React Native.
 */
export function captureGlobalErrors(): void {
  captureErrors((error, handled, data) => {
    trackError(error, { handled, data })
  })
}
