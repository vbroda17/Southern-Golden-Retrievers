// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // GitHub Pages configuration
  site: 'https://vbroda17.github.io',
  base: '/Southern-Golden-Retrievers/',
  
  // Build output
  outDir: './dist',
  
  server: {
    port: 4321
  }
});