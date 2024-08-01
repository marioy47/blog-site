document.addEventListener("astro:page-load", () => {
	const scrollToTop = document.getElementById("scroll-to-top");
	if (scrollToTop) {
		scrollToTop.addEventListener("click", () => {
			window.scrollTo(0, 0);
		});
	}
});
