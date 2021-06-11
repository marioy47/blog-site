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

## Setup

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

```json
{
  "...",
  "scripts": {
    "lint": "eslint --fix src/**/*.js"
  }
}
```

## Using promises

```bash
npm install axios --save
```

```javascript
// src/photos-promise.js
const axios = require("axios")
const photosUrl = "https://jsonplaceholder.typicode.com/photos"

axios({
  url: photosUrl,
  method: "GET",
})
  .then(res => {
    // Here is the main code of your application.
    console.log(res["data"])
  })
  .catch(err => {
    console.error(err)
  })

console.log("End of the code")
```

There are 2 issues with this kind of code:

- The code of your application gets burried inside a `then` statement
- The execution order can throw you off

```bash
$ node src/photos-promise.js

End of the code
[
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952'
  },
  {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796'
  },
  {
    albumId: 1,
    id: 3,
    title: 'officia porro iure quia iusto qui ipsa ut modi',
    url: 'https://via.placeholder.com/600/24f355',
    thumbnailUrl: 'https://via.placeholder.com/150/24f355'
  },
  ... 4900 more items
]
```

See how the message _End of code_ comes first? That's to be expected but can make your development experience less enjoyable.

## Converting a promise to async await

There are a couple of _gotchas_

- You have to enclose the promise code inside a function (In node 14.8 this is no longer the case)
- The function has to be preceded by the `async` code
- The part of the code that returns a promise has to be preceded by the `await` statment

```javascript
// src/photos-async-await.js
const axios = require("axios")
const photosUrl = "https://jsonplaceholder.typicode.com/photos"

const getPhotos = async () => {
  try {
    const res = await axios({ url: photosUrl, method: "GET" })
    console.log(res["data"])
  } catch (err) {
    console.error(err)
  }
}

getPhotos()
console.log("End of code")
```

```bash
$ node src/photos-async-await.js
End of code
[
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952'
  },
  {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796'
  },
  ...
]
```

## Using a IIFE function for top-level await

```javascript {14-17}
// src/photos-async-await.js
const axios = require("axios")
const photosUrl = "https://jsonplaceholder.typicode.com/photos"

const getPhotos = async () => {
  try {
    const res = await axios({ url: photosUrl, method: "GET" })
    console.log(res["data"])
  } catch (err) {
    console.error(err)
  }
}

;(async () => {
  await getPhotos()
  console.log("End of code")
})()
```

## Using `Promise.all()` and `Promise.any()`

The `Promise` object is not completelly useless with Async Await. Its still very useful with `Promise.all()`

## Original video

https://www.youtube.com/watch?v=_9vgd9XKlDQ
