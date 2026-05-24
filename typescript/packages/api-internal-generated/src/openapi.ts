import spec from './openapi.json'

export const openapi = spec as unknown as OpenAPISpec

export interface OpenAPISpec {
  swagger?: string
  openapi?: string
  info: { title: string; version: string; description?: string }
  basePath?: string
  paths: Record<string, Record<string, OpenAPIOperation>>
  definitions?: Record<string, OpenAPISchema>
  components?: { schemas?: Record<string, OpenAPISchema> }
}

export interface OpenAPIOperation {
  tags?: string[]
  summary?: string
  description?: string
  operationId?: string
  parameters?: OpenAPIParameter[]
  responses?: Record<string, OpenAPIResponse>
}

export interface OpenAPIParameter {
  name: string
  in: 'query' | 'path' | 'body' | 'header' | 'formData'
  description?: string
  required?: boolean
  type?: string
  format?: string
  schema?: OpenAPISchema
  enum?: (string | number)[]
  minimum?: number
  maximum?: number
  minLength?: number
  maxLength?: number
  default?: unknown
}

export interface OpenAPIResponse {
  description?: string
  schema?: OpenAPISchema
}

export interface OpenAPISchema {
  type?: string
  format?: string
  description?: string
  $ref?: string
  enum?: (string | number)[]
  items?: OpenAPISchema
  properties?: Record<string, OpenAPISchema>
  required?: string[]
  minimum?: number
  maximum?: number
}
