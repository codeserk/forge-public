import {
  DOUBLE_QUOTED_STRING_PATTERN,
  FIREFOX_STACK_FRAME_PATTERN,
  HEX_VALUE_PATTERN,
  NUMBER_PATTERN,
  SINGLE_QUOTED_STRING_PATTERN,
  UUID_PATTERN,
  V8_STACK_FRAME_PATTERN,
} from './error.const'
import type { FingerprintOptions, StackFrame } from './error.types'

/**
 * Parses a stack trace string into normalized frames.
 * Supports V8 (Chrome/Node) and Firefox/Safari formats.
 * @param stack Raw stack trace string
 * @return Parsed and normalized stack frames
 */
export function parseStack(stack: string): StackFrame[] {
  return stack
    .split('\n')
    .map((line) => parseLine(line.trim()))
    .filter((frame): frame is StackFrame => frame !== undefined)
}

/**
 * Strips dynamic values (numbers, UUIDs, hex, quoted strings) from an error message.
 * @param message Error message to strip
 * @return Message with dynamic values replaced by placeholders
 */
export function stripDynamicValues(message: string): string {
  return message
    .replace(UUID_PATTERN, '<uuid>')
    .replace(HEX_VALUE_PATTERN, '<hex>')
    .replace(NUMBER_PATTERN, '<n>')
    .replace(SINGLE_QUOTED_STRING_PATTERN, "'<s>'")
    .replace(DOUBLE_QUOTED_STRING_PATTERN, '"<s>"')
}

/**
 * Generates a fingerprint for an error, suitable for grouping identical errors.
 * Uses errorType + stripped message + top N stack frames.
 * @param error Error to fingerprint
 * @param options Fingerprinting options
 * @return Fingerprint string in the format `ErrorType-hash`
 */
export function generateFingerprint(error: Error, options?: FingerprintOptions): string {
  const maxFrames = options?.maxFrames ?? 3
  const errorType = error.name || 'Error'
  const strippedMessage = stripDynamicValues(error.message || '')

  let raw = `${errorType}:${strippedMessage}`

  if (error.stack) {
    const frames = parseStack(error.stack).slice(0, maxFrames)
    if (frames.length > 0) {
      raw += ':' + frames.map((f) => `${f.file}:${f.func}`).join('|')
    }
  }

  return `${errorType}-${generateDJB2Hash(raw)}`
}

/**
 * Parses a single stack trace line into a frame.
 * @param line Trimmed stack trace line
 * @return Parsed frame or undefined if not a valid frame
 */
function parseLine(line: string): StackFrame | undefined {
  if (!line || line.startsWith('Error') || line.startsWith('TypeError')) {
    return
  }

  return parseV8Frame(line) ?? parseFirefoxFrame(line)
}

/**
 * Parses a V8-format stack frame.
 * @param line Trimmed stack trace line
 * @return Parsed frame or undefined
 */
function parseV8Frame(line: string): StackFrame | undefined {
  const match = line.match(V8_STACK_FRAME_PATTERN)
  if (!match?.[2]) {
    return
  }

  return { func: match[1] || '<anonymous>', file: normalizeFile(match[2]) }
}

/**
 * Parses a Firefox/Safari-format stack frame.
 * @param line Trimmed stack trace line
 * @return Parsed frame or undefined
 */
function parseFirefoxFrame(line: string): StackFrame | undefined {
  const match = line.match(FIREFOX_STACK_FRAME_PATTERN)
  if (!match?.[2]) {
    return
  }

  return { func: match[1] || '<anonymous>', file: normalizeFile(match[2]) }
}

/**
 * Strips path, query strings, and hashes - keeps only the filename.
 * @param file Full file path or URL
 * @return Normalized filename
 */
function normalizeFile(file: string): string {
  const clean = file.split('?')[0]!.split('#')[0]!
  const parts = clean.split('/')

  return parts[parts.length - 1] || clean
}

/**
 * Simple djb2 hash returning an 8-char hex string.
 * @param input Input string to hash
 * @return 8-character hex hash
 */
function generateDJB2Hash(input: string): string {
  const hash = [...input].reduce((acc, char) => ((acc << 5) + acc + char.charCodeAt(0)) | 0, 5381)

  return (hash >>> 0).toString(16).padStart(8, '0')
}
