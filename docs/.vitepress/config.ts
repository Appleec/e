import { defineConfig } from 'vitepress';

const title = '@elinzy/e';
const description = 'A collection of TypeScript / JavaScript modules for multi-package repositories.';
const githubUrl = 'https://github.com/Appleec/e';
const siteUrl = 'https://elinzy.dev';

export default defineConfig({
  title,
  description,
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Config', link: '/config/installation' },
      { text: 'CLI', link: '/cli/guide' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Why @elinzy/e', link: '/guide/why' },
        ],
      },
      {
        text: 'Config',
        collapsed: false,
        items: [
          { text: 'Installation', link: '/config/installation' },
          { text: 'Extended Config', link: '/config/extended-config', collapsed: true,
            items: [
              { text: 'Rules', link: '/config/extended-config/rules' },
              { text: 'Plugins', link: '/config/extended-config/plugins' },
              { text: 'Configs', link: '/config/extended-config/configs' },
            ],
          },
          { text: 'Legacy Config', link: '/config/legacy-config' },
        ],
      },
      {
        text: 'CLI',
        items: [
          { text: 'Guide', link: '/cli/guide' },
          { text: 'Options', link: '/cli/options' },
        ],
      },
      {
        text: 'Customization',
        items: [
          { text: 'Strict Rules', link: '/customization/strict-rules' },
        ],
      },
      {
        text: 'Contribute',
        items: [
          { text: 'Contributing', link: '/contribute/guide' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: githubUrl },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-PRESENT Appleex',
    },
    editLink: {
      pattern: `${githubUrl}/edit/develop/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    search: { provider: 'local' },
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
  ],
});