import type { ErrorHandler } from './error.types'

/**
 * Registers global error handlers for the current environment.
 * Supports browser and Node.js. React Native capture lives in
 * `@codeserk/forge-stats-react-native`.
 * @param handler Callback invoked when an error is captured
 */
export function captureErrors(handler: ErrorHandler): void {
  captureBrowserErrors(handler)
  captureNodeErrors(handler)
}

/**
 * Registers browser global error handlers.
 * @param handler Callback invoked when an error is captured
 */
function captureBrowserErrors(handler: ErrorHandler): void {
  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
    return
  }

  window.addEventListener('error', (event: ErrorEvent) => {
    if (event.error instanceof Error) {
      handler(event.error, false)
    }
  })

  window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason))
    handler(error, false)
  })
}

/**
 * Registers Node.js global error handlers.
 * @param handler Callback invoked when an error is captured
 */
function captureNodeErrors(handler: ErrorHandler): void {
  if (typeof process === 'undefined' || typeof process.on !== 'function') {
    return
  }

  process.on('uncaughtException', (error: Error) => {
    handler(error, false)
  })

  process.on('unhandledRejection', (reason: unknown) => {
    const error = reason instanceof Error ? reason : new Error(String(reason))
    handler(error, false)
  })
}
