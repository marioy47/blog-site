document.addEventListener("astro:page-load", () => {
	const tags = getTagsInDatasets("article");

	if (location.hash) {
		toggleDisplayArticle(tags, location.hash.replace("#", ""));
	}

	//Unfortunately windows.addEventListener('hashchange') does not work on transtions.
	const anchors = Array.from(
		document.querySelectorAll("ul>li>a"),
	) as HTMLAnchorElement[];
	anchors.forEach((link) => {
		const href = new URL(
			link.getAttribute("href") ?? "",
			"https://whatever.com",
		);
		link.addEventListener("click", () =>
			toggleDisplayArticle(tags, href.hash.replace("#", "")),
		);
	});
});

const getTagsInDatasets = (selector: string): { [k: string]: string[] } => {
	const tags: { [k: string]: string[] } = {};
	const articles = Array.from(
		document.querySelectorAll(selector),
	) as HTMLElement[];
	articles.forEach((article) => {
		if (!article.dataset) return;
		tags[article.dataset?.articleId ?? ""] = article.dataset.tags?.split(
			",",
		) as string[];
	});
	return tags;
};

const toggleDisplayArticle = (
	tags: { [k: string]: string[] },
	filter: string,
) => {
	Object.keys(tags).forEach((article) => {
		const selector = `[data-article-id=${article}]`;
		if (tags[article].find((element) => element === filter)) {
			document.querySelector(selector)?.setAttribute("style", "");
		} else {
			document.querySelector(selector)?.setAttribute("style", "display: none");
		}
	});
};
