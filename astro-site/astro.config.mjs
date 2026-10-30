// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // GitHub Pages configuration
  site: 'https://vbroda17.github.io',
  base: '/Southern-Golden-Retrievers/',

  // Generates sitemap-index.xml listing every page for search engines
  integrations: [sitemap()],

  // Build output
  outDir: './dist',

  server: {
    port: 4321
  }
});
