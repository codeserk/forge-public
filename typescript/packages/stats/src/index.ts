export { Client } from './client/client.service'
export type {
  ClientOptions,
  SendEventParams,
  EventContent,
  EventMeta,
  EventData,
  Logger,
} from './client/client.types'

export {
  init,
  getClient,
  sendEvent,
  sendEvents,
  track,
  trackMany,
  trackView,
} from './client/client.module'
