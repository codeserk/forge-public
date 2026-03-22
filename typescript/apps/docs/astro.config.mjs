// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://forge.codeserk.es',
  integrations: [
    starlight({
      title: 'Forge',
      customCss: ['./src/styles/starlight.css'],

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
  ],
})
