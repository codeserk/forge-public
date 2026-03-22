// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig, envField } from 'astro/config'
import { loadEnv } from 'vite'
import { createRequire } from 'module'

import preact from '@astrojs/preact'

const require = createRequire(import.meta.url)

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_')

// https://astro.build/config
export default defineConfig({
  site: 'https://forge.codeserk.es',
  env: {
    schema: {
      PUBLIC_STATS_PREVIEW_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_STATS_BASE_URL: envField.string({ context: 'client', access: 'public', optional: true }),
      PUBLIC_STATS_SDK_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
  vite: {
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
        '@nsmr/pixelart-react': require.resolve('@nsmr/pixelart-react'),
      },
    },
    ssr: {
      noExternal: ['@nsmr/pixelart-react'],
    },
  },
  integrations: [
    starlight({
      title: 'Forge',
      customCss: ['./src/styles/starlight.css'],
      head: env.PUBLIC_STATS_BASE_URL && env.PUBLIC_STATS_SDK_KEY ? [
        {
          tag: 'script',
          attrs: {
            defer: true,
            src: 'https://forge.codeserk.es/cdn/stats.js',
            'data-base-url': env.PUBLIC_STATS_BASE_URL,
            'data-sdk': env.PUBLIC_STATS_SDK_KEY,
          },
        },
      ] : [],

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
                  items: [{ label: 'TypeScript', slug: 'docs/stats/usage/sdks/typescript' }],
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
