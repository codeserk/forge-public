/** Represents a single parsed stack frame. */
export interface StackFrame {
  readonly file: string
  readonly func: string
}

/** Callback invoked when a global error is captured. */
export type ErrorHandler = (
  error: Error,
  handled: boolean,
  data?: Readonly<Record<string, string | number | boolean>>,
) => void

/** Options for error fingerprinting. */
export interface FingerprintOptions {
  /** Number of top stack frames to include. @default 3 */
  readonly maxFrames?: number
}
