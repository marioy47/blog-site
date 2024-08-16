---
title: Javascript Promises, Async and Await tips and tricks
cover: ./ferenc-almasi-ayjnmG4oUX4-unsplash.jpg
date: 2021-06-11
tags: [ javascript, promises, async, await, iifi ]
---

So you hear about all the time about JavaScipt's [event loop](https://www.youtube.com/watch?v=8aGhZQkoFbQ) and how the it's an event driven single threaded programming language. But you don't fully grasp the implications of that statement until you start working with async code like calling an external API with the `fetch` function.

When you work with asynchronous code you have delve into the world of callbacks or promises.

In my case, I never had any issue understanding callbacks. They are ugly and produce the famous _callback hell_ where you can end up with functions that call functions that call functions that call... You guess it, functions. But they are easy to understand.

With promises I had a little more trouble since the syntax made me think that code that once was asynchronous, it magically became synchronous. And that's not the case. It's still asynchronous, but a little more _flatter_.

> Just remember that **to chain promises, you have to _return_ a promise at the end of each `then`**.

When _async await_ came into de picture, all became more clear once I understood that **async code need to be encapsulated in it's own _async_ function**

> That's why before NodeJS 16 you had to use IIFE functions. But more on that latter.

So here there are a couple of tricks that I've learned to work with asynchronous code and most of all, how to work with _Promises_ without losing my mind.

## Setup

If you want to follow along, you can start by setting up an example project:

```bash
mkdir javascript-async-await-tips
cd $_
npm init -y
npm install --save-dev eslint prettier
npx eslint --init # Answer the questions
npm install --save-dev eslint-plugin-prettier eslint-config-prettier
```

Change the `.eslintrc.json` file to enable _Prettier_.

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

And in `package.json` create a `lint` command to make things easier to fix.

```json
{
  "...",
  "scripts": {
    "lint": "eslint --fix src/**/*.js"
  }
}
```

Finally, create the `.editorconfig` file so your editor behaves as similar as prettier wants.

```ini
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf
; editorconfig-tools is unable to ignore longs strings or urls
max_line_length = off

[*.md]
indent_size = false
```

### Superagent

I've talked about how the JavaScript function `fetch` as a good example of an async function, but I want to work in the terminal with the `node` command, and NodeJS does not support the fetch function. An excellent replacement for fetch, that works both on the browser as in the server, is [superagent](https://www.npmjs.com/package/superagent) package to make requests, since `fetch` is only available in the browser. Additionally, it work both using _callbacks_ and with _promises_, so it's perfect for this article.

To install it, issue the now too familiar `npm install` command:

```bash
npm install superagent --save
```

Cool, as far as setup goes, we're done. Let's code.

## The "problem" with asynchronous functions

Let's start explaining how asynchronous functions work and some of it's issues. And for that let's create a simple **broken** function that "reads" the contents of a file.

```javascript {9,19}
// src/read-config.js
const fs = require("fs");
const path = require("path");

function readConfig(filename) {
  const config = path.dirname(__dirname) + `/config/${filename}`;
  let photosUrl = null;

  fs.readFile(`${config}`, "utf8", (err, data) => {
    if (err) {
      throw new Error(`Could not read the file ${config}`);
    }
    photosUrl = data.trim();
  });

  return photosUrl;
}

console.log(readConfig("photos.txt"));
```

The idea of this function is that it will try to read the contents of a file (the name of the file is the received parameter) placed in the `config/` directory and return its contents.

Now, this function **has a BIG issue**. If we execute it with `node` this is what we'll get:

```bash
$ node read-config.js

null
```

The "problem" is that `fs.readFile` is an **asynchronous function**, which means that the program execution won't wait for that function to execute. It will continue to programs flow.

So, when `fs.readFile` finishes reading the `config/photos.txt` file, `console.log`will already have been executed.

Now, to be fair, this is not a problem, but a great advantage of the language because some tasks, like reading a file, won't stop the program flow. But it offers a great challenge for developers.

## How to work with asynchronous functions

To fix the previous error, we have to change the `readConfig` function so it uses callbacks to print out the contents of the `photos.txt` file:

```javascript {10,12}
// src/read-config-callback.js
const fs = require("fs");
const path = require("path");

function readConfig(filename, callback, error) {
  const config = path.dirname(__dirname) + `/config/${filename}`;

  fs.readFile(`${config}`, "utf8", (err, data) => {
    if (err) {
      error(err);
    }
    callback(data.trim());
  });
}

readConfig(
  "photos.txt",
  function (contents) {
    console.log(`The config contents are "${contents}"`);
    // Execute additoinal callbacks here
  },
  function (err) {
    console.error(`The configuration file could not be read:`, err);
  }
);
```

> Notice how the function now executes the passed callbacks

To work with `fs.readFile` we had to make 2 big changes:

- Change the `readConfig` function so it receives **2 new parameters**:
  - A function to execute **after** the file has been read
  - A function to execute **if** an error occurs.
- Execute the `readConfig` passing **2 functions as parameters**

And now, the `readConfig` function won't return a string with the contents of the `photos.txt` file. Instead, it will execute functions on success or error.

Also, here we start to see the famous _Callback Hell_ issue, where we have to pass callback function all over the place.

> There is actually a site called [Callback Hell](http://callbackhell.com) that explains this problem.

And if we execute the script, we get something like:

```bash
$ node src/read-config-callback.js

The config contents are "https://jsonplaceholder.typicode.com/photos"
```

## Creating a basic promise

Let's start with a **basic promise**. Let's use the _Json Placeholder_ API from [Typicode](https://jsonplaceholder.typicode.com/photos) to extract some information.

```javascript {10,11}
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

- The _main_ code of your application gets buried inside a `then` statement
- The execution order can throw you off

Let's execute the script to prove that last statement:

```bash {3}
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

See how the message _End of code_ comes first? That's how asynchronous code works, it allows you to do multiple things at once, but it also can make your development experience less enjoyable.

## Converting a promise to async await

Using _async await_ helps your code to make more sense since you can crate **a part** of your code behave like synchronous code. Still, there are a couple of _gotchas_:

- You have to enclose the promise code inside a function
- The function has to be preceded by the `async` code
- The part of the code that returns a promise has to be preceded by the `await` statement
- The **new** function is also asynchronous, so you might need to use an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) function to call it

If we convert the previous promise into _async await_ this is what we'll en up with:

```javascript {5-10}
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

And if we execute it this is the result:

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

Notice how we still get the `End of code` string **before** the results. That's because `getPhotos` is asynchronous.

## Using a IIFE function for top-level await

To fix the issue of getting the `End of code` before the API call, we can enclose our **main code** in an _Async Self Executing Function_, or IIFE.

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

If you test this, you'll see that the `End of code` gets printed last.

You might be wondering why the `;` before the _IIFE_ function?. Well, since JavaScript does not require `;` at the end of the function, the interpreter might get confused when it sees a `(` as the first thing in the line. This is kind of a long discussion, so for now I'll say that using a `;` there is a good practice but not required.

## Using `Promise.all()` and `Promise.any()`

The `Promise` object is not completely useless now that Async Await exists. Its still very useful with `Promise.all()` for example:

```javascript {7,12,19}
// src/photos-promise-all.js
const axios = require("axios")
const photosUrl = "https://jsonplaceholder.typicode.com/photos"

const getPhotos = async () => {
  try {
    const res = await Promise.all([
      axios({ url: `${photosUrl}/15`, method: "GET" }),
      axios({ url: `${photosUrl}/25`, method: "GET" }),
      axios({ url: `${photosUrl}/35`, method: "GET" }),
    ])
    return res.map(item => item["data"])
  } catch (err) {
    console.error(err)
  }
}

;(async () => {
  const photos = await getPhotos()
  console.log(photos)
})()
```

Before I explain, notice how we changed the URL to fetch just **one photo** by specifying a _photo id_.

- In line 7 we use the `Promise.all` function to make 3 calls to an external API, one after the other.
- Since `Promiese.all` returns an array with the results, we used a `map` to traverse the results **and return an array**
- In line 19 we used the returned value which means that async function can have return values, but **they have to be used inside an another async function**
