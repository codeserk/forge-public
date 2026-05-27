import { captureReactNativeErrors } from './capture'

describe('capture', () => {
  describe('captureReactNativeErrors', () => {
    const g = globalThis as Record<string, unknown>
    let originalErrorUtils: unknown
    let originalHermes: unknown

    beforeEach(() => {
      originalErrorUtils = g.ErrorUtils
      originalHermes = g.HermesInternal
      g.ErrorUtils = {
        getGlobalHandler: () => () => {},
        setGlobalHandler: () => {},
      }
    })

    afterEach(() => {
      g.ErrorUtils = originalErrorUtils
      g.HermesInternal = originalHermes
    })

    it('should forward uncaught ErrorUtils errors as unhandled with the fatal flag', () => {
      // Arrange
      let globalHandler: (error: Error, isFatal: boolean) => void = () => {}
      g.ErrorUtils = {
        getGlobalHandler: () => () => {},
        setGlobalHandler: (fn: (error: Error, isFatal: boolean) => void) => {
          globalHandler = fn
        },
      }
      const handler = jest.fn()

      // Act
      captureReactNativeErrors(handler)
      globalHandler(new Error('boom'), true)

      // Assert
      expect(handler).toHaveBeenCalledWith(expect.any(Error), false, { fatal: true })
    })

    it('should chain the previous ErrorUtils handler', () => {
      // Arrange
      const previousHandler = jest.fn()
      let globalHandler: (error: Error, isFatal: boolean) => void = () => {}
      g.ErrorUtils = {
        getGlobalHandler: () => previousHandler,
        setGlobalHandler: (fn: (error: Error, isFatal: boolean) => void) => {
          globalHandler = fn
        },
      }

      // Act
      captureReactNativeErrors(jest.fn())
      const error = new Error('boom')
      globalHandler(error, false)

      // Assert
      expect(previousHandler).toHaveBeenCalledWith(error, false)
    })

    it('should forward unhandled promise rejections via the Hermes tracker', () => {
      // Arrange
      let onUnhandled: (id: number, error: unknown) => void = () => {}
      g.HermesInternal = {
        enablePromiseRejectionTracker: (options: {
          onUnhandled: (id: number, error: unknown) => void
        }) => {
          onUnhandled = options.onUnhandled
        },
      }
      const handler = jest.fn()

      // Act
      captureReactNativeErrors(handler)
      onUnhandled(1, new Error('rejected'))

      // Assert
      expect(handler).toHaveBeenCalledWith(expect.any(Error), false)
      expect(handler.mock.calls[0][0].message).toBe('rejected')
    })

    it('should wrap non-Error rejection reasons into Error', () => {
      // Arrange
      let onUnhandled: (id: number, error: unknown) => void = () => {}
      g.HermesInternal = {
        enablePromiseRejectionTracker: (options: {
          onUnhandled: (id: number, error: unknown) => void
        }) => {
          onUnhandled = options.onUnhandled
        },
      }
      const handler = jest.fn()

      // Act
      captureReactNativeErrors(handler)
      onUnhandled(1, 'string reason')

      // Assert
      expect(handler.mock.calls[0][0]).toBeInstanceOf(Error)
      expect(handler.mock.calls[0][0].message).toBe('string reason')
    })

    it('should not throw when Hermes is unavailable', () => {
      // Arrange
      g.HermesInternal = undefined
      const handler = jest.fn()

      // Act + Assert
      expect(() => captureReactNativeErrors(handler)).not.toThrow()
    })

    it('should do nothing when not running in React Native', () => {
      // Arrange
      g.ErrorUtils = undefined
      const enablePromiseRejectionTracker = jest.fn()
      g.HermesInternal = { enablePromiseRejectionTracker }
      const handler = jest.fn()

      // Act
      captureReactNativeErrors(handler)

      // Assert
      expect(enablePromiseRejectionTracker).not.toHaveBeenCalled()
    })
  })
})
