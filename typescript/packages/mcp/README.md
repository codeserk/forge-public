# @codeserk/forge-mcp

MCP server exposing the Forge internal API to AI assistants (Claude Code, Cursor, Claude Desktop).

The server exposes one tool: **`forge_evaluate(code)`**. The AI writes JavaScript that runs in a sandbox where `client` is a pre-authenticated `ForgeInternalClient`. The AI can compose, filter, and aggregate API calls without round-tripping through a typed schema for every endpoint.

## Install

```sh
npm install -g @codeserk/forge-mcp
```

## Configure your AI client

You need a SDK key from the Forge dashboard (Settings → Account → Personal access tokens → New token).

### Claude Desktop / Claude Code

In your MCP config (e.g. `~/.config/Claude/claude_desktop_config.json` or `.mcp.json`):

```json
{
  "mcpServers": {
    "forge": {
      "command": "forge-mcp",
      "env": {
        "FORGE_SDK_KEY": "paste-your-sdk-key-here",
        "FORGE_BASE_URL": "https://api-internal.forge.codeserk.es"
      }
    }
  }
}
```

`FORGE_BASE_URL` is optional; it defaults to production.

### Cursor

Same shape — `command: "forge-mcp"`, set the env vars.

## What the AI sees

Inside `forge_evaluate(code)`:

- `client` — a `ForgeInternalClient` instance, already bearer-authenticated and HMAC-signing every request.
- `console.log/info/warn/error` — captured into the tool response `logs` array.

The code is wrapped in `(async () => { ... })()`, so top-level `await` works. Whatever the code returns becomes the tool result.

## Example

The AI sends:

```js
const orgs = await client.organizations.getUserOrganizations()
const projects = await Promise.all(
  orgs.data.map((o) => client.projects.getProjects({ organizationID: o.id }))
)
return projects.flatMap((p) => p.data)
```

The MCP server runs that, awaits the result, and returns it as JSON.

## Trust model

This is a single-user MCP server you run locally. The code the AI provides has access to **your authenticated client only** — no `process`, no `fs`, no `require`, no network beyond what `client` exposes. The vm sandbox is not adversarial-grade (the AI could in theory invoke `Function()` or other escape hatches), but the effective blast radius is "anything your PAT scope allows". Mint a `read`-only PAT if you want to be conservative.

## Scopes

Mint a PAT with only the scopes you need: `read`, `create`, `update`, `delete`. A `read`-only PAT can list things via the SDK but cannot mutate.
