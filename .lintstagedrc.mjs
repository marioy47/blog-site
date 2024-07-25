// .lintstagedrc.mjs

/** @type {import("@commitlint/config-conventional").Config} */
export default {
  "*.{astro,js,ts}": "eslint --fix",
  "*.md": "markdownlint --fix",
  "*.{css,scss}": "stylelint --fix",
};
