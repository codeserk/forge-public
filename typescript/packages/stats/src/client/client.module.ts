import { Client } from './client.service'
import type { ClientOptions, SendEventParams } from './client.types'

let instance: Client | undefined

/** Initialises the singleton client. Must be called before {@link sendEvent}. */
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

/** Sends a tracking event using the singleton client. */
export async function sendEvent(params: SendEventParams): Promise<void> {
  return getClient().sendEvent(params)
}

/** Fire-and-forget wrapper around {@link sendEvent}. Logs errors instead of throwing. */
export function track(params: SendEventParams): void {
  getClient().track(params)
}
