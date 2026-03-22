// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Forge',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/codeserk/forge-public' },
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ label: 'Getting Started', slug: 'getting-started' }],
        },
      ],
    }),
  ],
})
