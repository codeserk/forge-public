import { captureErrors } from './capture'

describe('capture', () => {
  describe('captureErrors', () => {
    it('should capture uncaughtException in Node.js', () => {
      // Arrange
      const handler = jest.fn()

      // Act
      captureErrors(handler)
      process.emit('uncaughtException', new Error('boom'))

      // Assert
      expect(handler).toHaveBeenCalledWith(expect.any(Error), false)
      expect(handler.mock.calls[0][0].message).toBe('boom')
    })

    it('should capture unhandledRejection in Node.js', () => {
      // Arrange
      const handler = jest.fn()

      // Act
      captureErrors(handler)
      process.emit('unhandledRejection' as any, new Error('rejected'))

      // Assert
      expect(handler).toHaveBeenCalledWith(expect.any(Error), false)
      expect(handler.mock.calls[0][0].message).toBe('rejected')
    })

    it('should wrap non-Error rejection reasons into Error', () => {
      // Arrange
      const handler = jest.fn()

      // Act
      captureErrors(handler)
      process.emit('unhandledRejection' as any, 'string reason' as any)

      // Assert
      expect(handler.mock.calls[0][0]).toBeInstanceOf(Error)
      expect(handler.mock.calls[0][0].message).toBe('string reason')
    })
  })
})
