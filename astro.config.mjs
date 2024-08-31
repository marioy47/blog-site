// astro.config.mjs

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { transformerMetaHighlight } from "@shikijs/transformers";
import icon from "astro-icon";
import pagefind from "astro-pagefind";
import { defineConfig } from "astro/config";
import remarkUnwrapImages from "remark-unwrap-images";
import { loadEnv } from "vite";
import { remarkAlert } from "remark-github-blockquote-alert";
import rehypeTitleFigure from 'rehype-title-figure'


const { SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	site: SITE_URL ?? "https://localhost:4321",
	build: {
		format: "directory",
	},
	integrations: [tailwind(), pagefind(), sitemap(), partytown(), icon()],
	markdown: {
		shikiConfig: {
			// List of themes here: https://shiki.style/themes
			themes: {
				light: "rose-pine-moon",
				dark: "solarized-light",
			},
			transformers: [transformerMetaHighlight()],
		},
		remarkPlugins: [remarkAlert],
		rehypePlugins: [rehypeTitleFigure,  remarkAlert],
	},
});
