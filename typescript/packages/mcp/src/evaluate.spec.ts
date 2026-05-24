import type { ForgeInternalClient } from '@codeserk/forge-api-internal'

import { evaluate } from './evaluate'

function fakeClient(): ForgeInternalClient {
  return {
    auth: {
      getCurrentUser: async () => ({ data: { id: 'user-1', email: 'u@example.com' } }),
    },
    organizations: {
      getUserOrganizations: async () => ({ data: [{ id: 'org-1' }, { id: 'org-2' }] }),
    },
    personalAccessTokens: {
      listPersonalAccessTokens: async () => ({ data: [{ id: 'pat-1', name: 'a' }] }),
    },
  } as unknown as ForgeInternalClient
}

describe('evaluate', () => {
  it('should return the awaited value from the user code', async () => {
    // Arrange
    const client = fakeClient()

    // Act
    const result = await evaluate('return await client.auth.getCurrentUser()', { client })

    // Assert
    expect(result.ok).toBe(true)
    expect(result.value).toEqual({ data: { id: 'user-1', email: 'u@example.com' } })
    expect(result.error).toBeUndefined()
  })

  it('should capture console.log lines', async () => {
    // Arrange
    const client = fakeClient()

    // Act
    const result = await evaluate("console.log('hello'); console.log({a: 1}); return 1", { client })

    // Assert
    expect(result.ok).toBe(true)
    expect(result.logs).toEqual(['hello', '{"a":1}'])
  })

  it('should report errors thrown by user code', async () => {
    // Arrange
    const client = fakeClient()

    // Act
    const result = await evaluate("throw new Error('boom')", { client })

    // Assert
    expect(result.ok).toBe(false)
    expect(result.error?.message).toBe('boom')
    expect(result.value).toBeUndefined()
  })

  it('should let user code combine multiple async calls', async () => {
    // Arrange
    const client = fakeClient()
    const code = `
      const orgs = await client.organizations.getUserOrganizations()
      return orgs.data.map(o => o.id)
    `

    // Act
    const result = await evaluate(code, { client })

    // Assert
    expect(result.ok).toBe(true)
    expect(result.value).toEqual(['org-1', 'org-2'])
  })

  it('should not expose Node globals like process or require', async () => {
    // Arrange
    const client = fakeClient()

    // Act
    const result = await evaluate("return typeof process + ',' + typeof require", { client })

    // Assert
    expect(result.ok).toBe(true)
    expect(result.value).toBe('undefined,undefined')
  })

  it('should time out runaway synchronous loops', async () => {
    // Arrange
    const client = fakeClient()

    // Act
    const result = await evaluate('while (true) {}', { client, timeoutMs: 100 })

    // Assert
    expect(result.ok).toBe(false)
    expect(result.error?.message).toMatch(/time/i)
  })
})
