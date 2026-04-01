import { extractErrorName, generateFingerprint, parseStack, stripDynamicValues } from './error'

describe('error', () => {
  describe('parseStack', () => {
    it('should parse V8 stack frames into file and function', () => {
      // Arrange
      const stack = `Error: something broke
    at fetchData (http://example.com/js/utils.js:42:15)
    at getUser (http://example.com/js/api.js:10:3)
    at init (http://example.com/js/app.js:5:1)`

      // Act
      const result = parseStack(stack)

      // Assert
      expect(result).toEqual([
        { func: 'fetchData', file: 'utils.js' },
        { func: 'getUser', file: 'api.js' },
        { func: 'init', file: 'app.js' },
      ])
    })

    it('should parse Firefox/Safari stack frames', () => {
      // Arrange
      const stack = `fetchData@http://example.com/js/utils.js:42:15
getUser@http://example.com/js/api.js:10:3
init@http://example.com/js/app.js:5:1`

      // Act
      const result = parseStack(stack)

      // Assert
      expect(result).toEqual([
        { func: 'fetchData', file: 'utils.js' },
        { func: 'getUser', file: 'api.js' },
        { func: 'init', file: 'app.js' },
      ])
    })

    it('should use <anonymous> for frames without a function name', () => {
      // Arrange
      const stack = `Error: oops
    at http://example.com/js/bundle.js:1:100`

      // Act
      const result = parseStack(stack)

      // Assert
      expect(result[0]!.func).toBe('<anonymous>')
    })

    it('should strip query strings and hashes from filenames', () => {
      // Arrange
      const stack = `Error: oops
    at doStuff (http://example.com/js/app.js?v=123#hash:10:5)`

      // Act
      const result = parseStack(stack)

      // Assert
      expect(result[0]!.file).toBe('app.js')
    })
  })

  describe('stripDynamicValues', () => {
    it('should replace numbers with <n>', () => {
      // Arrange
      const input = 'Cannot read property at index 42'

      // Act
      const result = stripDynamicValues(input)

      // Assert
      expect(result).toBe('Cannot read property at index <n>')
    })

    it('should replace UUIDs with <uuid>', () => {
      // Arrange
      const input = 'User 550e8400-e29b-41d4-a716-446655440000 not found'

      // Act
      const result = stripDynamicValues(input)

      // Assert
      expect(result).toBe('User <uuid> not found')
    })

    it('should replace hex values with <hex>', () => {
      // Arrange
      const input = 'Invalid address 0xDEADBEEF'

      // Act
      const result = stripDynamicValues(input)

      // Assert
      expect(result).toBe('Invalid address <hex>')
    })

    it('should replace quoted strings with <s>', () => {
      // Arrange
      const input = "Cannot read property 'foo' of undefined"

      // Act
      const result = stripDynamicValues(input)

      // Assert
      expect(result).toBe("Cannot read property '<s>' of undefined")
    })
  })

  describe('generateFingerprint', () => {
    it('should produce the same fingerprint for identical errors', () => {
      // Arrange
      const stack = `Error: test error
    at doWork (http://example.com/app.js:10:5)
    at main (http://example.com/index.js:1:1)`
      const err1 = new Error('test error')
      err1.stack = stack
      const err2 = new Error('test error')
      err2.stack = stack

      // Act
      const fp1 = generateFingerprint(err1)
      const fp2 = generateFingerprint(err2)

      // Assert
      expect(fp1).toBe(fp2)
    })

    it('should produce different fingerprints for different stack traces', () => {
      // Arrange
      const err1 = new Error('test')
      err1.stack = `Error: test\n    at foo (http://example.com/a.js:1:1)`
      const err2 = new Error('test')
      err2.stack = `Error: test\n    at bar (http://example.com/b.js:1:1)`

      // Act
      const fp1 = generateFingerprint(err1)
      const fp2 = generateFingerprint(err2)

      // Assert
      expect(fp1).not.toBe(fp2)
    })

    it('should group errors with different dynamic values in messages', () => {
      // Arrange
      const stack = `Error: x\n    at lookup (http://example.com/users.js:5:1)`
      const err1 = new Error('User 123 not found')
      err1.stack = stack
      const err2 = new Error('User 456 not found')
      err2.stack = stack

      // Act
      const fp1 = generateFingerprint(err1)
      const fp2 = generateFingerprint(err2)

      // Assert
      expect(fp1).toBe(fp2)
    })

    it('should produce different fingerprints for different maxFrames', () => {
      // Arrange
      const err = new Error('oops')
      err.stack = `Error: oops
    at a (http://example.com/a.js:1:1)
    at b (http://example.com/b.js:1:1)
    at c (http://example.com/c.js:1:1)
    at d (http://example.com/d.js:1:1)`

      // Act
      const fp1 = generateFingerprint(err, { maxFrames: 1 })
      const fp3 = generateFingerprint(err, { maxFrames: 3 })

      // Assert
      expect(fp1).not.toBe(fp3)
    })

    it('should prefix the fingerprint with the error type', () => {
      // Arrange
      const err = new TypeError('bad type')
      err.stack = `TypeError: bad type\n    at fn (file.js:1:1)`

      // Act
      const result = generateFingerprint(err)

      // Assert
      expect(result).toMatch(/^TypeError-/)
    })

    it('should handle errors without a stack trace', () => {
      // Arrange
      const err = new Error('no stack')
      err.stack = undefined

      // Act
      const result = generateFingerprint(err)

      // Assert
      expect(result).toMatch(/^Error-[0-9a-f]{8}$/)
    })
  })

  describe('extractErrorName', () => {
    it('should use the message when available', () => {
      // Arrange
      const err = new Error('something broke')

      // Act
      const result = extractErrorName(err)

      // Assert
      expect(result).toBe('something broke')
    })

    it('should truncate long messages to 50 chars', () => {
      // Arrange
      const err = new Error(
        'this is a very long error message that exceeds the maximum allowed length for display',
      )

      // Act
      const result = extractErrorName(err)

      // Assert
      expect(result).toBe('this is a very long error message that exceeds the')
      expect(result).toHaveLength(50)
    })

    it('should use first stack frame func when message is generic "Error"', () => {
      // Arrange
      const err = new Error()
      err.message = 'Error'
      err.stack = `Error\n    at fetchData (http://example.com/js/utils.js:42:15)`

      // Act
      const result = extractErrorName(err)

      // Assert
      expect(result).toBe('fetchData')
    })

    it('should use error.name when message is empty and no stack', () => {
      // Arrange
      const err = new TypeError()
      err.message = ''
      err.stack = undefined

      // Act
      const result = extractErrorName(err)

      // Assert
      expect(result).toBe('TypeError')
    })

    it('should return Unknown Error when nothing is available', () => {
      // Arrange
      const err = new Error()
      err.message = ''
      err.name = 'Error'
      err.stack = undefined

      // Act
      const result = extractErrorName(err)

      // Assert
      expect(result).toBe('Unknown Error')
    })

    it('should skip generic "Error" name and fall back correctly', () => {
      // Arrange
      const err = new Error()
      err.message = ''
      err.name = 'Error'
      err.stack = `Error\n    at myFunction (app.js:1:1)`

      // Act
      const result = extractErrorName(err)

      // Assert
      expect(result).toBe('myFunction')
    })
  })
})
