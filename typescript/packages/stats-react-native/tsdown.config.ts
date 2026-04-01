import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: { build: true },
  clean: true,
  sourcemap: true,
  external: ['react-native', '@codeserk/forge-stats'],
})
