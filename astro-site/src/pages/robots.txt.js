// src/pages/robots.txt.js
// Tells search engines they can crawl everything and where the sitemap is.
// Built from `site` and `base` in astro.config.mjs, so it stays correct when the site moves to its own domain.
// Note: crawlers only read robots.txt at the root of a domain, so this takes effect once base is '/'.

export function GET({ site }) {
  const sitemapUrl = new URL(`${import.meta.env.BASE_URL}/sitemap-index.xml`.replace(/\/+/g, '/'), site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.href}\n`);
}
