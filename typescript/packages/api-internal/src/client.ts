import {
  AuthApi,
  Configuration,
  EventsApi,
  EventUsersApi,
  FunnelsApi,
  InvitationsApi,
  JourneysApi,
  OrganizationApi,
  PersonalAccessTokensApi,
  ProjectApi,
  SessionsApi,
  StatsApi,
  UserApi,
} from '@codeserk/forge-api-internal-generated'
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { DEFAULT_BASE_URL, SIGNATURE_APP } from './const'
import { decodeSDKKey } from './sdk-key'
import { SignatureBuilder } from './signature'
import type { ClientOptions, SignHashFn } from './types'

export class ForgeInternalClient {
  readonly auth: AuthApi
  readonly organizations: OrganizationApi
  readonly projects: ProjectApi
  readonly users: UserApi
  readonly invitations: InvitationsApi
  readonly stats: StatsApi
  readonly events: EventsApi
  readonly eventUsers: EventUsersApi
  readonly sessions: SessionsApi
  readonly journeys: JourneysApi
  readonly funnels: FunnelsApi
  readonly personalAccessTokens: PersonalAccessTokensApi

  private readonly http: AxiosInstance
  private readonly signingSecret: string
  private readonly signHashFn?: SignHashFn

  constructor(options: ClientOptions) {
    const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
    const { token, signingSecret } = decodeSDKKey(options.sdkKey)

    this.signingSecret = signingSecret
    this.signHashFn = options.signHashFn
    this.http = axios.create({ baseURL: baseUrl })
    this.http.interceptors.request.use((config) => this.signRequest(config))

    const config = new Configuration({ accessToken: token, apiKey: token })
    this.auth = new AuthApi(config, baseUrl, this.http)
    this.organizations = new OrganizationApi(config, baseUrl, this.http)
    this.projects = new ProjectApi(config, baseUrl, this.http)
    this.users = new UserApi(config, baseUrl, this.http)
    this.invitations = new InvitationsApi(config, baseUrl, this.http)
    this.stats = new StatsApi(config, baseUrl, this.http)
    this.events = new EventsApi(config, baseUrl, this.http)
    this.eventUsers = new EventUsersApi(config, baseUrl, this.http)
    this.sessions = new SessionsApi(config, baseUrl, this.http)
    this.journeys = new JourneysApi(config, baseUrl, this.http)
    this.funnels = new FunnelsApi(config, baseUrl, this.http)
    this.personalAccessTokens = new PersonalAccessTokensApi(config, baseUrl, this.http)
  }

  private async signRequest(
    config: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    const path = extractPath(config.url ?? '')
    const body = config.data

    const signature = await new SignatureBuilder(this.signingSecret, this.signHashFn)
      .withUrl(path)
      .withBody(body)
      .build()

    config.headers.set('x-signature-app', SIGNATURE_APP)
    config.headers.set('x-signature', signature)

    return config
  }
}

function extractPath(url: string): string {
  try {
    const parsed = new URL(url, 'http://placeholder')
    return parsed.pathname + parsed.search
  } catch {
    return url
  }
}
