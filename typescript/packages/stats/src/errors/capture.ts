import type { ErrorHandler } from './error.types'

/**
 * Registers global error handlers for the current environment.
 * Supports browser, Node.js, and React Native.
 * @param handler Callback invoked when an error is captured
 */
export function captureErrors(handler: ErrorHandler): void {
  captureBrowserErrors(handler)
  captureNodeErrors(handler)
  captureReactNativeErrors(handler)
}

/**
 * Registers browser global error handlers.
 * @param handler Callback invoked when an error is captured
 */
function captureBrowserErrors(handler: ErrorHandler): void {
  if (typeof window === 'undefined') {
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
  if (typeof process === 'undefined' || !process.on) {
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

/**
 * Registers React Native global error handler.
 * @param handler Callback invoked when an error is captured
 */
function captureReactNativeErrors(handler: ErrorHandler): void {
  const g = globalThis as Record<string, unknown>
  const errorUtils = g.ErrorUtils as
    | {
        getGlobalHandler: () => (...args: unknown[]) => void
        setGlobalHandler: (fn: (error: Error, isFatal: boolean) => void) => void
      }
    | undefined

  if (!errorUtils) {
    return
  }

  const previousHandler = errorUtils.getGlobalHandler()

  errorUtils.setGlobalHandler((error: Error, isFatal: boolean) => {
    handler(error, false, { fatal: isFatal })
    previousHandler(error, isFatal)
  })
}
