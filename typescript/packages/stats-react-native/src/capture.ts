import { type ErrorHandler, trackError } from '@codeserk/forge-stats'

/**
 * Registers React Native global error handlers and forwards captured errors
 * to the singleton client. Covers uncaught JS exceptions and unhandled
 * promise rejections.
 */
export function captureGlobalErrors(): void {
  captureReactNativeErrors((error, handled, data) => {
    trackError(error, { handled, data })
  })
}

/**
 * Registers React Native global error handlers.
 * Hooks ErrorUtils for uncaught exceptions and the Hermes rejection tracker
 * for unhandled promise rejections (which do not flow through ErrorUtils).
 * @param handler Callback invoked when an error is captured
 */
export function captureReactNativeErrors(handler: ErrorHandler): void {
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

  captureReactNativeRejections(g, handler)
}

/**
 * Enables unhandled promise rejection tracking on Hermes. React Native only
 * enables this in development, so production rejections are otherwise dropped
 * silently and never reach ErrorUtils.
 * @param g Global object
 * @param handler Callback invoked when an error is captured
 */
function captureReactNativeRejections(g: Record<string, unknown>, handler: ErrorHandler): void {
  const hermes = g.HermesInternal as
    | {
        enablePromiseRejectionTracker?: (options: {
          allRejections: boolean
          onUnhandled: (id: number, error: unknown) => void
        }) => void
      }
    | undefined

  if (typeof hermes?.enablePromiseRejectionTracker !== 'function') {
    return
  }

  hermes.enablePromiseRejectionTracker({
    allRejections: true,
    onUnhandled: (_id, rejection) => {
      const error = rejection instanceof Error ? rejection : new Error(String(rejection))
      handler(error, false)
    },
  })
}
