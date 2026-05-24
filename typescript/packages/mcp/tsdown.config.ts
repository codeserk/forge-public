import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['cjs', 'esm'],
  dts: { build: true },
  clean: true,
  sourcemap: true,
  target: 'node20',
})
