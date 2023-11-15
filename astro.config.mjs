import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';
import sitemap from '@astrojs/sitemap';
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://marioyepes.com',
  integrations: [mdx(), sitemap(), partytown()],
  markdown: {
    remarkPlugins: [remarkToc],
    shikiConfig: {
      theme: "material-theme-ocean"
    }
  }
});
