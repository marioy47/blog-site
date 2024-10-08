import { getCollection } from "astro:content";

export async function GET({ params }) {
	if (params?.cloudflare === "_redirects") {
		const posts = await getCollection("blog");
		const redirPosts = posts.reduce((accum, current) => {
			return `${accum}/${current.slug}/ /blog/${current.slug}/ 301\n`;
		}, "");

		const projects = await getCollection("portfolio");
		const redirProjects = projects.reduce((accum, current) => {
			return `${accum}/${current.slug}/ /portfolio/${current.slug}/ 301\n`;
		}, "");
		return new Response(redirPosts + redirProjects);
	}
}

export function getStaticPaths() {
	return [{ params: { cloudflare: "_redirects" } }];
}
