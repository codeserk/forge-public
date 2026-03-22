import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['iife'],
  globalName: 'ForgeStats',
  dts: false,
  clean: true,
  minify: true,
  sourcemap: true,
  platform: 'browser',
  deps: { alwaysBundle: ['@codeserk/forge-stats'] },
})
