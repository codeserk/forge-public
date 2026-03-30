// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig, envField } from 'astro/config'
import { loadEnv } from 'vite'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

import preact from '@astrojs/preact'

/** @type {import('vite').Plugin} */
const pixelartIconsPlugin = {
  name: 'virtual:pixelart-icons',
  resolveId(id) {
    if (id === 'virtual:pixelart-icons') {
      return '\0virtual:pixelart-icons'
    }
  },
  load(id) {
    if (id !== '\0virtual:pixelart-icons') {
      return
    }
    const svgDir = new URL('../../../node_modules/@nsmr/pixelart-react/svg', import.meta.url)
      .pathname
    /** @type {Record<string, string>} */
    const icons = {}
    for (const file of readdirSync(svgDir)) {
      if (!file.endsWith('.svg') || file.endsWith('-sharp.svg')) continue
      const name = file.replace('.svg', '')
      const content = readFileSync(join(svgDir, file), 'utf-8')
      const match = content.match(/d="([^"]+)"/)
      if (match) {
        icons[name] = match[1]
      }
    }
    return `export const ICONS = ${JSON.stringify(icons)}`
  },
}

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_')

// https://astro.build/config
export default defineConfig({
  site: 'https://forge.codeserk.es',
  env: {
    schema: {
      PUBLIC_STATS_PREVIEW_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_STATS_BASE_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_STATS_SDK_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [pixelartIconsPlugin],
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
    },
  },
  integrations: [
    starlight({
      title: 'Forge',
      customCss: ['./src/styles/starlight.css'],
      head:
        env.PUBLIC_STATS_BASE_URL && env.PUBLIC_STATS_SDK_KEY
          ? [
              {
                tag: 'script',
                attrs: {
                  defer: true,
                  src: 'https://forge.codeserk.es/cdn/stats.js',
                  'data-base-url': env.PUBLIC_STATS_BASE_URL,
                  'data-sdk': env.PUBLIC_STATS_SDK_KEY,
                },
              },
            ]
          : [],

      components: {
        ThemeSelect: './src/components/starlight/ThemeSelect.astro',
        SocialIcons: './src/components/starlight/SocialIcons.astro',
        PageFrame: './src/components/starlight/PageFrame.astro',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/codeserk/forge-public' },
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ label: 'Introduction', slug: 'docs/introduction' }],
        },
        {
          label: 'Stats',
          items: [
            { label: 'Overview', slug: 'docs/stats' },
            {
              label: 'Usage',
              items: [
                { label: 'Script (CDN)', slug: 'docs/stats/usage/script' },
                {
                  label: 'SDKs',
                  items: [
                    { label: 'TypeScript', slug: 'docs/stats/usage/sdks/typescript' },
                    { label: 'C#', slug: 'docs/stats/usage/sdks/csharp' },
                    { label: 'Unity', slug: 'docs/stats/usage/sdks/unity' },
                  ],
                },
                {
                  label: 'Integrations',
                  items: [{ label: 'Astro', slug: 'docs/stats/usage/integrations/astro' }],
                },
              ],
            },
          ],
        },
      ],
    }),
    preact(),
  ],
})
