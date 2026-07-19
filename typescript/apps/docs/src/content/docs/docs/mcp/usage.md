---
title: Usage
description: What the AI sees, the response shape, the trust model, and a full example.
---

## Discover the API with `forge_help`

`forge_help()` returns namespace + method listings. Call it before `forge_evaluate` to avoid guessing method names or parameter shapes:

```
forge_help()                                         # list namespaces
forge_help({ api: "events" })                        # list methods on the events namespace
forge_help({ api: "events", method: "getEvents" })   # full signature for one method
forge_help({ api: "concepts" })                      # behavioural gotchas / design notes
```

## Run code with `forge_evaluate`

Inside `forge_evaluate(code)`:

- `client` - a `ForgeInternalClient` instance, already bearer-authenticated and HMAC-signing every request.
- `console.log` / `info` / `warn` / `error` - captured into the tool response `logs` array.

The code is wrapped in `(async () => { ... })()`, so top-level `await` works. Whatever the code returns becomes the tool result (JSON-serialised).

### Response shape

Every call responds with:

```ts
{
  ok: boolean
  value: unknown         // whatever the code returned
  logs: string[]         // captured console output
  error?: {
    name: string         // "TypeError", "ForgeApiError", etc.
    message: string
    stack?: string       // includes the host stack; treat as sensitive if you log it
    hint?: string        // e.g. suggestions for missing required params
  }
}
```

Failures set `ok: false` and populate `error`.

### Timeouts

The synchronous part of the sandbox has a **15s guard**: infinite loops and CPU-bound work get killed. Async work (`await client.*`, other promises) is bounded by the HTTP client timeout, not by the sandbox - if a promise never settles the tool call hangs until the AI client gives up.

## Example

The assistant asks for "top 5 event types by volume":

```js
const orgs = await client.organizations.getUserOrganizations()
const [org] = orgs.data
const projects = await client.projects.getUserProjects({})
const [project] = projects.data.filter((p) => p.organizationID === org.id)

const summaries = await client.events.getEventSummaries({ projectID: project.id, limit: 100 })
return summaries.data.items
  .sort((a, b) => b.totalCount - a.totalCount)
  .slice(0, 5)
  .map((s) => ({ type: s.type, totalCount: s.totalCount }))
```

The MCP server runs that in-process, awaits the result, returns JSON. No custom tool per endpoint.

## Trust model

Single-user, runs on your machine. The sandbox has access to `client` only - no `process`, no `fs`, no `require`, no network beyond what `client` reaches. The vm sandbox is not adversarial-grade (a determined assistant could invoke `Function()` or similar escape hatches), but the effective blast radius is "anything your PAT scope allows".

Practical guidance:

- Use a read-only Personal Access Token (PAT) for browsing / exploration.
- Create a scoped PAT per project when the assistant needs to mutate.
- Rotate the PAT if you paste the config into a shared repo by mistake.
- The server does not phone home. All traffic goes to `FORGE_BASE_URL`.

## Out of scope for v1

- No local caching of API responses. Every `client.*` call round-trips.
- No streaming responses. The tool result is one JSON blob.
- No prompt library or preset queries. The assistant composes freely against the API.
- No sandbox escape hardening. Trust model is single-user, PAT-scoped.
- No public-API MCP variant. The exposed client is the internal (dashboard) API, not the SDK-facing public API.
