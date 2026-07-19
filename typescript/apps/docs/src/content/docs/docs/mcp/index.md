---
title: Forge MCP
description: Run the Forge MCP server locally so Claude Code, Cursor and Claude Desktop can query and mutate your Forge project data from the editor.
---

Forge ships an MCP (Model Context Protocol) server that exposes the Forge internal API to AI assistants. Point Claude Code, Cursor or Claude Desktop at it and they can list orgs, query events, aggregate stats, and edit configuration without a copy-paste loop through the dashboard.

It is a single-user server that you run locally. It authenticates with a Personal Access Token (PAT) that you mint in the dashboard, and only reaches Forge - nothing else.

## Two tools

- **`forge_help`** - discovery. Lists the namespaces on the internal API client, methods per namespace and full method signatures. Also exposes a `concepts` topic that documents behavioural gotchas not in the OpenAPI spec.
- **`forge_evaluate`** - runs JavaScript in a sandbox where `client` is a pre-authenticated `ForgeInternalClient`. The assistant composes, filters and aggregates API calls without a round-trip per endpoint.

One evaluator covers the full API surface. Adding new endpoints on the server does not require new MCP tools.

## Install

The MCP server is published on npm as [`@codeserk/forge-mcp`](https://www.npmjs.com/package/@codeserk/forge-mcp).

You have two ways to run it:

```sh
# global install - simple, but you have to remember to update
npm install -g @codeserk/forge-mcp

# or let the AI client run it via npx - no install, pinned per config
# (use "command": "npx" in the MCP config; see Configure)
```

Tested with Node 20 and 22.

## Get a token

Forge dashboard -> Settings -> Account -> Personal access tokens -> **New token**. The token is shown once at create time. If you lose it, revoke it from the same page and mint a new one.

Scopes map to HTTP methods:

| Scope    | HTTP verb        |
| -------- | ---------------- |
| `read`   | GET              |
| `create` | POST             |
| `update` | PUT / PATCH      |
| `delete` | DELETE           |

Mint the narrowest scope that fits your use. `read` is enough to browse; add `create` to run mutations (including the read-only `/evaluate` previews, which are POST).

Token-management endpoints are blocked for PAT callers. A PAT can never mint or revoke other tokens.

## Next steps

- [Configure](/docs/mcp/configure) your AI client (Claude Desktop, Claude Code, Cursor).
- [Usage](/docs/mcp/usage) - what the tools return, the response shape, the trust model and a full example.
