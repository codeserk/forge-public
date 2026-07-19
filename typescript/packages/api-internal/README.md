# @codeserk/forge-api-internal

Authenticated TypeScript client for the Forge internal API. Use this from scripts, the MCP server, or any code that needs to read or mutate Forge data on behalf of a user.

## Install

```sh
npm install @codeserk/forge-api-internal
```

## Usage

Get a SDK key from the dashboard (Settings -> Account -> Personal access tokens -> New token). The key is shown once and never again. Paste it into your env:

```ts
import { ForgeInternalClient } from '@codeserk/forge-api-internal'

const client = new ForgeInternalClient({
  baseUrl: 'https://api-internal.forge.codeserk.es',
  sdkKey: process.env.FORGE_SDK_KEY!,
})

const me = await client.auth.getCurrentUser()
const orgs = await client.organizations.getUserOrganizations()
```

The client handles PAT bearer auth and HMAC signing. Every request is signed with the per-PAT signing secret derived from the SDK key.

## Scopes

Each PAT has one or more scopes: `read`, `create`, `update`, `delete`. The server enforces them based on the HTTP verb:

- `GET` -> `read`
- `POST` -> `create`
- `PUT` / `PATCH` -> `update`
- `DELETE` -> `delete`

A read-only token can list but not mutate.
