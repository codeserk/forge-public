---
title: Configure your AI client
description: Point Claude Desktop, Claude Code, Cursor or any stdio MCP client at Forge.
---

Your AI client launches the MCP server as a child process. You point it at either the globally-installed `forge-mcp` bin or `npx @codeserk/forge-mcp`, and pass one required environment variable (`FORGE_SDK_KEY`) plus an optional override (`FORGE_BASE_URL`).

## Claude Desktop / Claude Code

Edit your MCP config:

- **Linux** - `~/.config/Claude/claude_desktop_config.json`
- **macOS** - `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Project-scoped** - `.mcp.json` in the repo root

```json
{
  "mcpServers": {
    "forge": {
      "command": "forge-mcp",
      "env": {
        "FORGE_SDK_KEY": "paste-your-pat-here",
        "FORGE_BASE_URL": "https://api-internal.forge.codeserk.es"
      }
    }
  }
}
```

Or, if you prefer `npx` over a global install:

```json
{
  "mcpServers": {
    "forge": {
      "command": "npx",
      "args": ["-y", "@codeserk/forge-mcp"],
      "env": { "FORGE_SDK_KEY": "paste-your-pat-here" }
    }
  }
}
```

`FORGE_BASE_URL` is optional (defaults to production). Point it at a local dev server if you run the API locally.

**Do not commit the config with the PAT inline.** If the config lives in your repo (`.mcp.json`), gitignore it or read the token from your shell environment instead. If it leaks, revoke and mint a new one.

## Cursor

Same shape under Cursor's MCP config: `command: "forge-mcp"`, same env vars, under `mcpServers`.

## Other MCP clients

Any client that speaks stdio MCP works. Set the command to `forge-mcp` and pass `FORGE_SDK_KEY` in the environment. `FORGE_BASE_URL` overrides the target instance.

## Environment variables

| Variable         | Required | Default                                     | Description                                                                 |
| ---------------- | -------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| `FORGE_SDK_KEY`  | yes      | -                                           | Personal Access Token (PAT) from the Forge dashboard. Shown once at create time. |
| `FORGE_BASE_URL` | no       | `https://api-internal.forge.codeserk.es`    | Override for local dev or a self-hosted instance.                           |
