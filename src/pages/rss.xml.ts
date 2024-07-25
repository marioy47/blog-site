// src/pages/rss.xml.ts

import rss from "@astrojs/rss";
import { type AstroConfig } from "astro";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
const markdownParser = new MarkdownIt();

export const GET = async (context: AstroConfig) => {
	const entries = await getCollection("blog", (entry) => {
		return import.meta.env.PROD ? !entry.data.draft : true;
	});
	return rss({
		title: "Mario's Blog",
		description: "Mario Yepes Portfolio and Blog",
		site: context.site || "https://astro.config.mjs/not/configured/yet",
		items: entries
			.map((entry) => ({
				title: entry.data.title,
				pubDate: entry.data.date,
				description: "No desc",
				link: `/${entry.collection}/${entry.slug}`,
				content: sanitizeHtml(markdownParser.render(entry.body), {
					allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
				}),
			}))
			.sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()),
	});
};
