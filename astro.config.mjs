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
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
