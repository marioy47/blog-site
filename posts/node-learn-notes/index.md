---
title: Node and NPM notes
---

# Notes and NPM notes

https://nodejs.dev/learn/how-to-use-the-nodejs-repl

## Node.js REPL


`_` will print the result of the last operation
`.help` Dot commands help
`.editor` Multiple lines of code. Use `ctr-c` to execute
`.load` Loads a js file
`.clear` Clears the console
`.exit`

  ## Arguments

  Uses the variable

  ```bash
  node script.js arg1
  ```

  ```javascript
  process.argv[0]
  ```

  Or use the [`minimist`]() library

## Console

```javascript
console.log('A string is %s and a Digit is %d', 'A STRING', 10);
```

Also `%i` for integers and `%o` for objects

```javascript
console.clear();
console.count('string to count');
console.trace();

console.time('Start timer');
console.timeEnd('Ends the timer');
```

Color uses [escape sequences](https://gist.github.com/iamnewton/8754917)


## Exports

`module.exports` returns an object
`exports` returns the items not the object itself

```javascript
// module.js
module.exports = function myFunction() {
  console.log('Function on module');
}

// index.js
const x = require('./module')()
```

```javascript
// module2.js
exports = function secondFunction() {
  console.log('This is the second function');
}

// index2.js
var y = require('./module2');
y.secondFunction();
```

## Timers

```javascript
setTimeout( (para1, para2) => {
  console.log( para1, para2);
}, time, firstParam, secondParam);
```

This will run forever at the interval 

```javascript
const intevalId = setInterval( () => {
  console.log('This will run every 2 seconds');
}, 2000);

clearInterval(intevalId);
```

`setImmediate` is like `setTimeout` with the diference that it will get executed in the next event loop run.

## Asynchronicity

Js is _synchronous_ by default and single threaded.

Node uses _error-first callbacks_ on it's events. Meaning that the callback of an event receives first the error object if any.

```javascript
fs.readFile('/file.json', (err, data) => {
  // Return if error not null. Process otherwise.
});
```
 
## Promises

Definition:

> A proxy for a value that will eventually become available

_Promisify_ is a technique where you create a function that takes a callback and returns a promise. 

```javascript
const getFile = filename => {
  return new Promise( (resolve, reject) => {
    // The code you want to execute.
  });
}

getFile('/tmp/filename.json')
  .then( data => console.log(data))
  .catch( error => console.error(error));
```

In node there is a [module](https://nodejs.org/docs/latest-v11.x/api/util.html#util_util_promisify_original) that already does that for you **if** the function you want to promisify receives and error and a callback:

```javascript
const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);
stat('/tmp/filename.json')
  .then( data => console.log(data) )
  .catch( err => console.error(err) );
```

One important thing to keep in mind: **the function inside a promise is executed automatically when the promise is constructed**.https://mail.google.com/mail/u/0/#inbox/FMfcgxwLtbBFfRNCKmlpBDSghwZMMSf
