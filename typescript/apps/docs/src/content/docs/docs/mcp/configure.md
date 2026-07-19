---
title: Configure your AI client
description: Point Claude Code, Cursor, Claude Desktop or any stdio MCP client at Forge.
---

Your AI client launches the MCP server as a child process. You point it at either the globally-installed `forge-mcp` bin or `npx @codeserk/forge-mcp`, and pass one required environment variable (`FORGE_SDK_KEY`) plus an optional override (`FORGE_BASE_URL`).

## Claude Code

Claude Code reads MCP config from `.mcp.json` in the project root (or `~/.claude/mcp.json` for user-scoped servers).

```json
{
  "mcpServers": {
    "forge": {
      "command": "forge-mcp",
      "env": {
        "FORGE_SDK_KEY": "paste-your-pat-here"
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

**Do not commit `.mcp.json` with the PAT inline.** Gitignore it, or read the token from your shell environment instead of pasting it. If it leaks, revoke and create a new one.

## Cursor

Same shape under Cursor's MCP config: `command: "forge-mcp"`, same env vars, under `mcpServers`.

## Claude Desktop

Edit your MCP config:

- **Linux** - `~/.config/Claude/claude_desktop_config.json`
- **macOS** - `~/Library/Application Support/Claude/claude_desktop_config.json`

Use the same JSON shape as the Claude Code example above.

## Other MCP clients

Any client that speaks stdio MCP works. Set the command to `forge-mcp` and pass `FORGE_SDK_KEY` in the environment. `FORGE_BASE_URL` overrides the target instance.

## Environment variables

| Variable         | Required | Default                                     | Description                                                                 |
| ---------------- | -------- | ------------------------------------------- | --------------------------------------------------------------------------- |
| `FORGE_SDK_KEY`  | yes      | -                                           | Personal Access Token (PAT) from the Forge dashboard. Shown once when you create it. |
| `FORGE_BASE_URL` | no       | `https://api-internal.forge.codeserk.es`    | Override for local dev or a self-hosted instance.                           |
