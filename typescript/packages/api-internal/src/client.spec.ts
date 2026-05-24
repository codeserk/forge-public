import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { ForgeInternalClient } from './client'
import { decodeSDKKey } from './sdk-key'

const TOKEN = 'fg_abcdef0123456789'
const SECRET = 'signing-secret-xyz'
const SDK_KEY = btoa(`${TOKEN}___${SECRET}`)

type Sent = {
  url?: string
  headers: Record<string, string>
  data?: unknown
}

function captureAdapter(): { adapter: AxiosAdapter; sent: Sent[] } {
  const sent: Sent[] = []
  const adapter: AxiosAdapter = async (config) => {
    sent.push({
      url: typeof config.url === 'string' ? config.url : undefined,
      headers: headersToObject(config.headers),
      data: config.data,
    })
    return {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    } as AxiosResponse
  }
  return { adapter, sent }
}

function headersToObject(headers: InternalAxiosRequestConfig['headers']): Record<string, string> {
  const out: Record<string, string> = {}
  if (!headers) {
    return out
  }
  const raw = headers as unknown as Record<string, unknown>
  for (const key of Object.keys(raw)) {
    const v = raw[key]
    if (v === undefined || v === null) {
      continue
    }
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      out[key.toLowerCase()] = String(v)
    }
  }
  return out
}

describe('ForgeInternalClient', () => {
  it('should expose all api classes', () => {
    // Arrange + Act
    const client = new ForgeInternalClient({ sdkKey: SDK_KEY })

    // Assert
    expect(client.auth).toBeDefined()
    expect(client.organizations).toBeDefined()
    expect(client.projects).toBeDefined()
    expect(client.users).toBeDefined()
    expect(client.invitations).toBeDefined()
    expect(client.stats).toBeDefined()
    expect(client.events).toBeDefined()
    expect(client.eventUsers).toBeDefined()
    expect(client.sessions).toBeDefined()
    expect(client.journeys).toBeDefined()
    expect(client.funnels).toBeDefined()
    expect(client.personalAccessTokens).toBeDefined()
  })

  it('should throw when sdkKey is malformed', () => {
    // Arrange + Act + Assert
    expect(() => new ForgeInternalClient({ sdkKey: btoa('no-separator') })).toThrow()
  })

  it('should decode the sdk key into a token and a signing secret', () => {
    // Arrange + Act
    const decoded = decodeSDKKey(SDK_KEY)

    // Assert
    expect(decoded.token).toBe(TOKEN)
    expect(decoded.signingSecret).toBe(SECRET)
  })

  it('should set Authorization, x-signature-app and x-signature on every request', async () => {
    // Arrange
    const { adapter, sent } = captureAdapter()
    const client = new ForgeInternalClient({ sdkKey: SDK_KEY, baseUrl: 'http://localhost:5000' })
    ;(client as any).http.defaults.adapter = adapter

    // Act
    await client.personalAccessTokens.listPersonalAccessTokens()

    // Assert
    expect(sent).toHaveLength(1)
    const headers = sent[0]!.headers
    expect(headers['authorization']).toContain(TOKEN)
    expect(headers['x-signature-app']).toBe('sdk')
    expect(headers['x-signature']).toBeTruthy()
    expect(headers['x-signature']!.length).toBeGreaterThan(20)
  })

  it('should sign each request with a value that depends on the URL', async () => {
    // Arrange
    const { adapter, sent } = captureAdapter()
    const client = new ForgeInternalClient({ sdkKey: SDK_KEY, baseUrl: 'http://localhost:5000' })
    ;(client as any).http.defaults.adapter = adapter

    // Act
    await client.personalAccessTokens.listPersonalAccessTokens()
    await client.organizations.getUserOrganizations()

    // Assert
    expect(sent).toHaveLength(2)
    expect(sent[0]!.headers['x-signature']).not.toBe(sent[1]!.headers['x-signature'])
  })

  it('should use the custom signHashFn when provided', async () => {
    // Arrange
    const customSign = jest.fn(async () => 'custom-signature')
    const { adapter, sent } = captureAdapter()
    const client = new ForgeInternalClient({
      sdkKey: SDK_KEY,
      baseUrl: 'http://localhost:5000',
      signHashFn: customSign,
    })
    ;(client as any).http.defaults.adapter = adapter

    // Act
    await client.personalAccessTokens.listPersonalAccessTokens()

    // Assert
    expect(customSign).toHaveBeenCalledTimes(1)
    expect(sent[0]!.headers['x-signature']).toBe('custom-signature')
  })

  it('should default to the production base url when none is given', () => {
    // Arrange + Act
    const client = new ForgeInternalClient({ sdkKey: SDK_KEY })

    // Assert
    expect((client as any).http.defaults.baseURL).toBe('https://api-internal.forge.codeserk.es')
  })
})
