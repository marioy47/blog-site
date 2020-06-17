---
title: Configure Eslint for WordPress Theme development
date: 2020-06-15
cover:
tags: wordpress, javascript, eslint, prettier
---

# Configure Eslint for WordPress Theme development

[Getting Started](https://eslint.org/docs/user-guide/getting-started)

Analyzes code without executing it

So you can share the lint configuration with Continues Integration.

## Eslint Rules

Eslint documentation > rules

https://eslint.org/docs/rules/

Some of the default rules that it comes with

you can use rules from another company like AirBnB

## Installation

```bash
npm init -y
npm install eslint @wordpress/eslint-plugin --save-dev
./node_modules/.bin/eslint --init

```

```json
{
  "name": "wordpress-eslint-prettier-config",
  "version": "1.0.0",
  "description": "A tutorial repo for configuring eslint and prettier for Wordpress JS code",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["wordpress", "eslint", "prettier"],
  "author": "Mario Yepes <marioy47@gmail.com>",
  "license": "MIT"
}
```

## Configuration

```json
{
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "rules": {}
}
```

## Check for errors

```json
{
...
	"scripts": {
		"lint": "eslint src/js/**/*.js"
	}
...
}
```

## Vim

You need to install prettier

```bash
npm install --save-dev prettier
```

Install CoC and `coc-eslint`
command! -nargs=0 Prettier :CocCommand prettier.formatFile
"coc.preferences.formatOnSaveFiletypes": ["css", "markdown"],

Create `.eslintrc` file

```json
{
  "env": {
    "browser": true,
    "es2020": true
  },
  "extends": "plugin:@wordpress/eslint-plugin/recommended",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "rules": {}
}
```

Create `.prettierrc` file

```yaml
useTabs: true
tabWidth: 2
printWidth: 100
singleQuote: true
trailingComma: es5
bracketSpacing: true
parenSpacing: true
jsxBracketSameLine: false
semi: true
arrowParens: avoid
endOfLine: auto
```
