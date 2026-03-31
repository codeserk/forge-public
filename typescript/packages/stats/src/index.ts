export { Client } from './client/client.service'
export type {
  ClientOptions,
  SendEventParams,
  EventContent,
  EventMeta,
  EventData,
  ErrorEventOptions,
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
  sendError,
  trackError,
  captureGlobalErrors,
} from './client/client.module'

export { generateFingerprint, parseStack, stripDynamicValues } from './errors/error'
export type { StackFrame, FingerprintOptions } from './errors/error.types'
