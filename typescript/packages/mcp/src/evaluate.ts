import { ForgeInternalClient } from '@codeserk/forge-api-internal'
import vm from 'node:vm'

export interface EvaluateOptions {
  client: ForgeInternalClient
  /** Hard timeout in ms for the user code. Default 15s. */
  timeoutMs?: number
}

export interface EvaluateResult {
  ok: boolean
  /** JSON-serializable result of the user code, if any. */
  value?: unknown
  /** Captured console output lines. */
  logs: string[]
  /** Error message + name if the user code threw. */
  error?: { name: string; message: string; stack?: string }
}

/**
 * Runs AI-supplied JS in a vm sandbox with `client` pre-bound to a
 * ForgeInternalClient. The code is wrapped in an async function so it can
 * await client calls naturally. Whatever the function returns becomes
 * `result.value`.
 */
export async function evaluate(code: string, options: EvaluateOptions): Promise<EvaluateResult> {
  const logs: string[] = []
  const consoleProxy = {
    log: (...args: unknown[]) => logs.push(args.map(stringifyArg).join(' ')),
    info: (...args: unknown[]) => logs.push(args.map(stringifyArg).join(' ')),
    warn: (...args: unknown[]) => logs.push('WARN: ' + args.map(stringifyArg).join(' ')),
    error: (...args: unknown[]) => logs.push('ERROR: ' + args.map(stringifyArg).join(' ')),
  }

  const context = vm.createContext({
    client: options.client,
    console: consoleProxy,
  })

  const wrapped = `(async () => {\n${code}\n})()`

  try {
    const promise = vm.runInContext(wrapped, context, {
      timeout: options.timeoutMs ?? 15_000,
    }) as Promise<unknown>
    const value = await promise
    return { ok: true, value, logs }
  } catch (err) {
    const e = err as Error
    return {
      ok: false,
      logs,
      error: { name: e.name, message: e.message, stack: e.stack },
    }
  }
}

function stringifyArg(arg: unknown): string {
  if (typeof arg === 'string') {
    return arg
  }
  try {
    return JSON.stringify(arg)
  } catch {
    return String(arg)
  }
}
