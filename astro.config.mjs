import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gonavi.org',
  integrations: [
    mdx(),
    sitemap({
      // The root route only selects a language and canonicals to /zh/.
      filter: (page) => page !== 'https://gonavi.org/',
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en-US',
        },
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      // Both palettes are emitted as CSS variables; pages.css decides which one shows.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
    },
  },
});
