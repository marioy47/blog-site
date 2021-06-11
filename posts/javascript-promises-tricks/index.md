---
title: Javascript Promises Tips and Tricks
cover:
date: 2021-06-11
tags: javascript, promises, async, await, iifi
---

# Javascript Promises Tips and Tricks

Most of my career I've worked with procedural languages where each instruction is executed sequentially and there is no need to handle asynchronous data or information.

But, since I've been working with Node full time for the last year, I needed to get familiar on how the event loop works and how async code works in a single threaded language.

So here there are a couple of tricks that I've learned to work with asynchronous code and most of all, how to work with _Promises_ without losing my mind.

## TOC

```toc

```

## The initial code

```bash
npm init -y
npx eslint --init
npm install --save-dev eslint-plugin-prettier eslint-config-prettier
```

```json
{
  "env": {
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:prettier/recommended"],
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "prettier/prettier": ["warn"]
  }
}
```


## Original video

https://www.youtube.com/watch?v=_9vgd9XKlDQ
