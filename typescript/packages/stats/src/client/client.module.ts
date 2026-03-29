import { Client } from './client.service'
import type { ClientOptions, EventContent, EventMeta, SendEventParams } from './client.types'

let instance: Client | undefined

/** Initialises the singleton client. Must be called before any send/track calls. */
export function init(options: ClientOptions): void {
  instance = new Client(options)
}

/** Returns the singleton client, throwing if {@link init} has not been called. */
export function getClient(): Client {
  if (!instance) {
    throw new Error('Forge Stats is not initialised. Call init() first.')
  }
  return instance
}

/** Sends one or more tracking events using the singleton client. */
export async function sendEvents(params: SendEventParams): Promise<void> {
  return getClient().sendEvents(params)
}

/** Sends a single tracking event using the singleton client. */
export async function sendEvent(content: EventContent, meta?: EventMeta): Promise<void> {
  return getClient().sendEvent(content, meta)
}

/** Fire-and-forget wrapper around {@link sendEvents}. Logs errors instead of throwing. */
export function trackMany(params: SendEventParams): void {
  getClient().trackMany(params)
}

/** Fire-and-forget for a single event. Logs errors instead of throwing. */
export function track(content: EventContent, meta?: EventMeta): void {
  getClient().track(content, meta)
}

/** Convenience method to track a single View event. */
export function trackView(name: string, meta?: EventMeta): void {
  getClient().trackView(name, meta)
}
