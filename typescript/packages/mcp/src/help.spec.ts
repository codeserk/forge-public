import type { OpenAPISpec } from '@codeserk/forge-api-internal-generated'

import { buildHelpIndex, renderHelp } from './help'

const SPEC: OpenAPISpec = {
  info: { title: 'Test', version: '1' },
  paths: {
    '/api/v1/events': {
      get: {
        tags: ['events'],
        operationId: 'getEvents',
        summary: 'Get events',
        parameters: [
          { name: 'limit', in: 'query', required: true, type: 'integer', minimum: 1, maximum: 100 },
          { name: 'projectID', in: 'query', required: true, type: 'string' },
          { name: 'dateFrom', in: 'query', required: false, type: 'string' },
          { name: 'period', in: 'query', required: false, type: 'string', enum: ['day', 'week', 'month'] },
        ],
        responses: {
          '200': { schema: { $ref: '#/definitions/events.EventsResponse' } },
        },
      },
    },
    '/api/v1/projects': {
      get: {
        tags: ['project'],
        operationId: 'getUserProjects',
        summary: 'Get user projects',
        parameters: [],
        responses: {
          '200': { schema: { type: 'array', items: { $ref: '#/definitions/project.response' } } },
        },
      },
    },
  },
  definitions: {
    'events.EventsResponse': {
      type: 'object',
      required: ['items', 'total'],
      properties: {
        items: { type: 'array', items: { $ref: '#/definitions/events.EventResponse' } },
        total: { type: 'integer', description: 'Total number of events matching filters' },
        page: { type: 'integer' },
      },
    },
    'events.EventResponse': {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
      },
    },
  },
}

describe('buildHelpIndex', () => {
  it('should index by api namespace and operationId', () => {
    // Arrange + Act
    const idx = buildHelpIndex(SPEC)

    // Assert
    expect(Object.keys(idx.byApi).sort()).toEqual(['events', 'project'])
    expect(idx.byOperationId.getEvents).toBeDefined()
    expect(idx.byOperationId.getEvents!.params).toHaveLength(4)
    expect(idx.byOperationId.getEvents!.responseRef).toBe('events.EventsResponse')
  })
})

describe('renderHelp', () => {
  const idx = buildHelpIndex(SPEC)

  it('should list namespaces when called with no args', () => {
    // Act
    const out = renderHelp(idx)

    // Assert
    expect(out).toMatch(/client\.events/)
    expect(out).toMatch(/client\.projects/)
    expect(out).toMatch(/1 method/)
  })

  it('should list methods on a namespace when given api', () => {
    // Act
    const out = renderHelp(idx, { api: 'events' })

    // Assert
    expect(out).toMatch(/getEvents/)
    expect(out).toMatch(/\{ limit, projectID, dateFrom\?, period\? \}/)
    expect(out).toMatch(/GET \/api\/v1\/events/)
  })

  it('should detail a single method when given api + method', () => {
    // Act
    const out = renderHelp(idx, { api: 'events', method: 'getEvents' })

    // Assert
    expect(out).toMatch(/limit: integer \(1\.\.100\)/)
    expect(out).toMatch(/projectID: string/)
    expect(out).toMatch(/dateFrom\?: string/)
    expect(out).toMatch(/period\?: "day" \| "week" \| "month"/)
    expect(out).toMatch(/Response: events\.EventsResponse/)
    expect(out).toMatch(/total: integer — Total number of events matching filters/)
    expect(out).toMatch(/items: events\.EventResponse\[\]/)
    expect(out).toMatch(/page\?: integer/)
    expect(out).toMatch(/id\?: string/)
  })

  it('should report an unknown api gracefully', () => {
    // Act
    const out = renderHelp(idx, { api: 'ghost' })

    // Assert
    expect(out).toMatch(/Unknown api/)
    expect(out).toMatch(/events/)
  })

  it('should accept the JS property name as an alias for the swagger tag', () => {
    // Act — swagger tag is "project", JS property is "projects"
    const singular = renderHelp(idx, { api: 'project' })
    const plural = renderHelp(idx, { api: 'projects' })

    // Assert
    expect(singular).toMatch(/getUserProjects/)
    expect(plural).toBe(singular)
  })

  it('should accept the JS property name when fetching a method', () => {
    // Act — swagger tag is "events", JS property is "events" (already same here)
    const out = renderHelp(idx, { api: 'events', method: 'getEvents' })

    // Assert
    expect(out).toMatch(/client\.events\.getEvents/)
  })

  it('should report an unknown method gracefully', () => {
    // Act
    const out = renderHelp(idx, { api: 'events', method: 'nope' })

    // Assert
    expect(out).toMatch(/Unknown method/)
  })
})
