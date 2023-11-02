import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://marioyepes.com',
	integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkToc]
  }
});
