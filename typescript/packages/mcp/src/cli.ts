#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

import { createForgeMCPServer } from './server'

async function main(): Promise<void> {
  const sdkKey = process.env.FORGE_SDK_KEY
  if (!sdkKey) {
    process.stderr.write('FORGE_SDK_KEY env var is required\n')
    process.exit(1)
  }

  const baseUrl = process.env.FORGE_BASE_URL
  const server = createForgeMCPServer({ sdkKey, baseUrl })

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  process.stderr.write(`forge-mcp: ${err instanceof Error ? err.message : String(err)}\n`)
  process.exit(1)
})
