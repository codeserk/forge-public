import type {
  OpenAPIOperation,
  OpenAPIParameter,
  OpenAPISchema,
  OpenAPISpec,
} from '@codeserk/forge-api-internal-generated'

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const

export interface HelpIndex {
  /** namespace -> method name -> method info */
  byApi: Record<string, Record<string, MethodInfo>>
  /** flat operationId -> method info, for error enrichment */
  byOperationId: Record<string, MethodInfo>
  /** definition name -> schema */
  definitions: Record<string, OpenAPISchema>
}

export interface MethodInfo {
  api: string
  method: string
  httpMethod: string
  path: string
  summary?: string
  description?: string
  params: ParamInfo[]
  responseRef?: string
}

export interface ParamInfo {
  name: string
  in: OpenAPIParameter['in']
  required: boolean
  type: string
  description?: string
}

/** Builds a discovery index from a swagger spec. */
export function buildHelpIndex(spec: OpenAPISpec): HelpIndex {
  const byApi: Record<string, Record<string, MethodInfo>> = {}
  const byOperationId: Record<string, MethodInfo> = {}
  const definitions = spec.definitions ?? spec.components?.schemas ?? {}

  for (const path of Object.keys(spec.paths)) {
    const item = spec.paths[path]!
    for (const httpMethod of HTTP_METHODS) {
      const op = item[httpMethod] as OpenAPIOperation | undefined
      if (!op || !op.operationId) {
        continue
      }
      const api = tagToApi(op.tags?.[0])
      const method = op.operationId
      const info: MethodInfo = {
        api,
        method,
        httpMethod: httpMethod.toUpperCase(),
        path,
        summary: op.summary,
        description: op.description,
        params: (op.parameters ?? []).map(toParamInfo),
        responseRef: extractRef(op.responses?.['200']?.schema),
      }
      byApi[api] ??= {}
      byApi[api]![method] = info
      byOperationId[method] = info
    }
  }

  return { byApi, byOperationId, definitions }
}

function tagToApi(tag?: string): string {
  if (!tag) {
    return 'unknown'
  }
  // swagger tags are kebab/space; openapi-generator-cli classifies APIs the same way.
  return tag
}

function toParamInfo(p: OpenAPIParameter): ParamInfo {
  return {
    name: p.name,
    in: p.in,
    required: !!p.required,
    type: paramType(p),
    description: p.description,
  }
}

function paramType(p: OpenAPIParameter): string {
  // Enum trumps base type (carries more info)
  if (p.enum) {
    return p.enum.map((e) => JSON.stringify(e)).join(' | ')
  }
  const base = p.type
    ? p.format
      ? `${p.type}<${p.format}>`
      : p.type
    : p.schema
      ? schemaType(p.schema)
      : 'unknown'
  const constraints = constraintSuffix(p)
  return constraints ? `${base} ${constraints}` : base
}

function constraintSuffix(p: OpenAPIParameter): string {
  const bits: string[] = []
  if (p.minimum !== undefined && p.maximum !== undefined) {
    bits.push(`${p.minimum}..${p.maximum}`)
  } else if (p.minimum !== undefined) {
    bits.push(`>=${p.minimum}`)
  } else if (p.maximum !== undefined) {
    bits.push(`<=${p.maximum}`)
  }
  if (p.minLength !== undefined || p.maxLength !== undefined) {
    bits.push(`len ${p.minLength ?? 0}..${p.maxLength ?? '∞'}`)
  }
  if (p.default !== undefined) {
    bits.push(`default ${JSON.stringify(p.default)}`)
  }
  return bits.length > 0 ? `(${bits.join(', ')})` : ''
}

function schemaType(s: OpenAPISchema): string {
  if (s.$ref) {
    return refToName(s.$ref)
  }
  if (s.type === 'array' && s.items) {
    return `${schemaType(s.items)}[]`
  }
  if (s.enum) {
    return s.enum.map((e) => JSON.stringify(e)).join(' | ')
  }
  return s.type ?? 'unknown'
}

function extractRef(s?: OpenAPISchema): string | undefined {
  if (!s) {
    return undefined
  }
  if (s.$ref) {
    return refToName(s.$ref)
  }
  if (s.type === 'array' && s.items?.$ref) {
    return refToName(s.items.$ref) + '[]'
  }
  return s.type
}

function refToName(ref: string): string {
  return ref.replace(/^#\/(definitions|components\/schemas)\//, '')
}

export interface RenderHelpOptions {
  api?: string
  method?: string
}

export function renderHelp(index: HelpIndex, options: RenderHelpOptions = {}): string {
  const resolvedApi = options.api ? resolveApiKey(index, options.api) : undefined
  if (resolvedApi && options.method) {
    return renderMethod(index, resolvedApi, options.method)
  }
  if (resolvedApi) {
    return renderApi(index, resolvedApi)
  }
  if (options.api) {
    // input was given but no match — fall through with the original key to surface the error
    return renderApi(index, options.api)
  }
  return renderIndex(index)
}

/** Accept either the swagger tag ("project") or the JS property name ("projects"). */
function resolveApiKey(index: HelpIndex, input: string): string | undefined {
  if (index.byApi[input]) {
    return input
  }
  for (const tag of Object.keys(index.byApi)) {
    if (apiPropName(tag) === input) {
      return tag
    }
  }
  return undefined
}

function renderIndex(index: HelpIndex): string {
  const lines: string[] = []
  lines.push('Available API namespaces on `client`:')
  lines.push('')
  const apis = Object.keys(index.byApi).sort()
  for (const api of apis) {
    const count = Object.keys(index.byApi[api]!).length
    lines.push(`  client.${apiPropName(api)} — ${count} method${count === 1 ? '' : 's'}`)
  }
  lines.push('')
  lines.push('Call forge_help with `api: "<name>"` to list methods, or `api + method` for full signature.')
  return lines.join('\n')
}

function renderApi(index: HelpIndex, api: string): string {
  const methods = index.byApi[api]
  if (!methods) {
    return `Unknown api "${api}". Known: ${Object.keys(index.byApi).sort().join(', ')}`
  }
  const lines: string[] = []
  lines.push(`client.${apiPropName(api)} methods:`)
  lines.push('')
  for (const name of Object.keys(methods).sort()) {
    const m = methods[name]!
    const required = m.params.filter((p) => p.required).map((p) => p.name)
    const optional = m.params.filter((p) => !p.required).map((p) => p.name)
    const sig = `{ ${[...required, ...optional.map((p) => `${p}?`)].join(', ')} }`
    lines.push(`  ${name}(${sig}) — ${m.httpMethod} ${m.path}`)
    if (m.summary) {
      lines.push(`    ${m.summary}`)
    }
  }
  return lines.join('\n')
}

function renderMethod(index: HelpIndex, api: string, method: string): string {
  const info = index.byApi[api]?.[method]
  if (!info) {
    return `Unknown method "${api}.${method}". Try forge_help with just api to list methods.`
  }
  const lines: string[] = []
  lines.push(`client.${apiPropName(api)}.${method}`)
  lines.push(`  ${info.httpMethod} ${info.path}`)
  if (info.summary) {
    lines.push(`  ${info.summary}`)
  }
  if (info.description) {
    lines.push(`  ${info.description}`)
  }
  lines.push('')
  lines.push('Call signature: a single object with these fields')
  if (info.params.length === 0) {
    lines.push('  (no parameters)')
  } else {
    for (const p of info.params) {
      const req = p.required ? '' : '?'
      const desc = p.description ? ` — ${p.description}` : ''
      lines.push(`  ${p.name}${req}: ${p.type} (in: ${p.in})${desc}`)
    }
  }
  if (info.responseRef) {
    lines.push('')
    lines.push(`Response: ${info.responseRef} (accessible via res.data)`)
    const schemaName = info.responseRef.replace(/\[\]$/, '')
    const schema = index.definitions[schemaName]
    if (schema) {
      const fieldLines = renderSchemaFields(schema, index, 0, new Set([schemaName]))
      if (fieldLines.length > 0) {
        lines.push(...fieldLines)
      }
    }
  }
  return lines.join('\n')
}

function renderSchemaFields(
  schema: OpenAPISchema,
  index: HelpIndex,
  depth: number,
  seen: Set<string>,
): string[] {
  if (depth > 2 || !schema.properties) {
    return []
  }
  const required = new Set(schema.required ?? [])
  const indent = '  '.repeat(depth + 1)
  const lines: string[] = []
  for (const name of Object.keys(schema.properties)) {
    const field: OpenAPISchema = schema.properties[name]!
    const req = required.has(name) ? '' : '?'
    const type = schemaType(field)
    const desc = field.description ? ` — ${field.description}` : ''
    lines.push(`${indent}${name}${req}: ${type}${desc}`)
    // Expand nested refs once
    const refName = field.$ref ? refToName(field.$ref) : field.items?.$ref ? refToName(field.items.$ref) : undefined
    if (refName && !seen.has(refName) && index.definitions[refName] && depth < 1) {
      seen.add(refName)
      lines.push(...renderSchemaFields(index.definitions[refName]!, index, depth + 1, seen))
    }
  }
  return lines
}

/**
 * Convert a swagger tag (`"personal-access-tokens"`) into the JS property name
 * exposed on ForgeInternalClient. openapi-generator-cli capitalizes per-word and
 * the wrapper exposes camelCase versions of those.
 */
function apiPropName(tag: string): string {
  const camel = tag.replace(/-(.)/g, (_, c: string) => c.toUpperCase())
  // Pluralization quirks we know about — covers the actual exposed properties.
  const map: Record<string, string> = {
    auth: 'auth',
    organization: 'organizations',
    project: 'projects',
    user: 'users',
    users: 'users',
    invitations: 'invitations',
    stats: 'stats',
    events: 'events',
    'event-users': 'eventUsers',
    sessions: 'sessions',
    journey: 'journeys',
    journeys: 'journeys',
    funnel: 'funnels',
    funnels: 'funnels',
    'personal-access-tokens': 'personalAccessTokens',
  }
  return map[tag] ?? camel
}
