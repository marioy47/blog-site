// eslint.config.mjs

import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

// Additional plugins
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import("typescript-eslint").Config} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts,astro}"] }, // Add the astro extension
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	// Add the following plugin rules
	...eslintPluginAstro.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		settings: { react: { version: "detect" } }, // in case you install React latter
	},
	{
		rules: {
			"prettier/prettier": "warn", // Code style as "errors" and not "warnings" seem like an overkill to me.
		},
	},
	{
		ignores: ["src/env.d.ts", ".astro/"],
	},
];
