import { ForgeInternalClient } from '@codeserk/forge-api-internal'
import { openapi } from '@codeserk/forge-api-internal-generated'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

import { evaluate } from './evaluate'
import { buildHelpIndex, renderHelp } from './help'

export interface ServerOptions {
  sdkKey: string
  baseUrl?: string
}

const FORGE_EVALUATE_DESCRIPTION = [
  'Runs the given JavaScript inside a sandbox where `client` is a pre-authenticated',
  'ForgeInternalClient instance. The code is wrapped in an async function so you can',
  'use top-level await. Whatever the code returns is sent back as the tool result.',
  '',
  'Discover the API surface FIRST with forge_help — call it with no args to list',
  'namespaces, then with `api: "<name>"` to list methods, then `api + method` for',
  'the full call signature (parameter shape is a single object, not positional).',
  '',
  'Examples:',
  '  return await client.auth.getCurrentUser()',
  '  const orgs = await client.organizations.getUserOrganizations(); return orgs.data',
  '  const e = await client.events.getEvents({ limit: 1, projectID, dateFrom, dateTo }); return e.data.total',
].join('\n')

const FORGE_HELP_DESCRIPTION = [
  'Discover what methods are available on the Forge internal API client.',
  '',
  'Call patterns:',
  '  forge_help()                              — list all API namespaces and method counts',
  '  forge_help({ api: "events" })             — list every method on EventsApi with one-line signatures',
  '  forge_help({ api: "events", method: "getEvents" }) — full signature with param types and response type',
  '',
  'Use this BEFORE forge_evaluate to avoid guessing method names or parameter shapes.',
].join('\n')

const forgeEvaluateInputSchema = {
  code: z
    .string()
    .min(1)
    .describe('JavaScript source to evaluate. Has access to `client` and `console`.'),
}

const forgeHelpInputSchema = {
  api: z
    .string()
    .optional()
    .describe('Namespace tag from swagger, e.g. "events", "projects", "personal-access-tokens".'),
  method: z
    .string()
    .optional()
    .describe('operationId, e.g. "getEvents". Requires `api`.'),
}

export function createForgeMCPServer(options: ServerOptions): McpServer {
  const client = new ForgeInternalClient({
    sdkKey: options.sdkKey,
    baseUrl: options.baseUrl,
  })

  const helpIndex = buildHelpIndex(openapi)

  const server = new McpServer({
    name: 'forge-mcp',
    version: '0.1.0',
  })

  ;(server.tool as any)(
    'forge_help',
    FORGE_HELP_DESCRIPTION,
    forgeHelpInputSchema,
    async ({ api, method }: { api?: string; method?: string }) => {
      const text = renderHelp(helpIndex, { api, method })
      return { content: [{ type: 'text', text }] }
    },
  )

  ;(server.tool as any)(
    'forge_evaluate',
    FORGE_EVALUATE_DESCRIPTION,
    forgeEvaluateInputSchema,
    async ({ code }: { code: string }) => {
      const result = await evaluate(code, { client })

      const enrichedError = result.error
        ? { ...result.error, hint: enrichError(result.error.message, helpIndex) }
        : undefined

      const text = JSON.stringify(
        {
          ok: result.ok,
          value: serializableValue(result.value),
          logs: result.logs,
          error: enrichedError,
        },
        null,
        2,
      )

      return {
        content: [{ type: 'text', text }],
        isError: !result.ok,
      }
    },
  )

  return server
}

function enrichError(
  message: string,
  helpIndex: ReturnType<typeof buildHelpIndex>,
): string | undefined {
  // openapi-generator-cli throws: "Required parameter X was null or undefined when calling Y."
  const m = message.match(/Required parameter (\w+) was null or undefined when calling (\w+)\./)
  if (!m) {
    return undefined
  }
  const [, paramName, operationId] = m
  const info = helpIndex.byOperationId[operationId!]
  if (!info) {
    return undefined
  }
  const required = info.params.filter((p) => p.required).map((p) => p.name)
  const optional = info.params.filter((p) => !p.required).map((p) => p.name + '?')
  return [
    `Method ${info.api}.${operationId} takes a single object: { ${[...required, ...optional].join(', ')} }`,
    `Missing required field: ${paramName}.`,
    `Tip: call forge_help with api="${info.api}", method="${operationId}" for full signature.`,
  ].join(' ')
}

function serializableValue(value: unknown): unknown {
  if (value === undefined) {
    return undefined
  }
  try {
    return JSON.parse(JSON.stringify(value))
  } catch {
    return String(value)
  }
}
