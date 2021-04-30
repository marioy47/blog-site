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

## Process

```javascript
process.exit(1);
//
process.exitCode = 1;
```

This prevents that the port stays open:

```javascript
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hola mundo');
});
const server = app.listen( port, () => console.log('Ready!!!'));

process.on('SIGTERM', () => {
  server.close( () => {
    console.info('Process terminaded');
  });
});
```

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

The definition is **A proxy for a value that will eventually become available**.

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

## Async / Await

They make asynchronous code **look** synchronous even though it isn't
Prepending `async` to a function will make it return a promise even if the `new Promise(...)` bit is not declared


```javascript
const longJob = () => {
	return new Promise( (resolve, reject) => {
		setTimeout( () => resolve('I waited for 2 seconds'), 2000);
	});
}

const exeLongJob = async () => {
	console.log( await longJob());
}

console.log('Before');
exeLongJob();
console.log('After');
```

The output of the above function would be:

```txt
Before
After
I waited for 2 seconds
```

With a 2 second pause between the `After` and the `I waited for 2 seconds` line.

Note 2 things:

- You have to prepend `await` when calling the _promisified_ function so the code stops until the promise is resolved.
- The calling function ( the `clientFunction`) needs to be declared as an `async` function

## Event emitter

They are like the events that are used in the browser

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('start', () =>  {
	console.log('I\'m listening for the event');
});
emitter.on('start', () =>  {
	console.log('I\'m listening too');
});

setTimeout( () => emitter.emit('start'), 3000);
```

```txt
I'm listening for the event
I'm listening too
```

## HTTP server

```javascript
const http = require('http');

const port = process.env.PORT || 8080;

const server = http.createServer( (request, response) => {
	response.statusCode = 200;
	response.setHeader('Content-Type', 'application/json');
	response.end('{message: "Hello World"}');
});

server.listen( port, () => {
	console.log('Server listening');
});
```

```bash
$ curl -i http://localhost:8080
HTTP/1.1 200 OK
Content-Type: application/json
Date: Thu, 29 Apr 2021 22:15:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 24

{message: "Hello World"}
```

## HTTP

```javascript
const https = require('https');

const options = {
	host: 'marioyepes.com',
	port: 443,
	path: '/blog/',
	method: 'GET'
}

const request = https.request( options, response => {
	console.log('Request made. Status code:', response.statusCode);

	response.on('data', data => {
		process.stdout.write(data);
	});
});

request.on('error', error => {
	console.error('An error ocurred', error);
});

request.end();
```

## Reading and writing files

```javascript
const fs = require('fs');

const theContent = 'This is the content';

fs.writeFile('./testfile.txt', theContent, err => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(`Wrote "${theContent}" to the file`);
});

fs.readFile('./testfile.txt', 'utf8', (error, data) => {
	if (error) {
		console.error('An error ocurred', error);
		return;
	}
	console.log(`This are the contents of the file "${data}"`);
});
```

Important: The full contents of the file will be read in memory.

## Buffers

Are fixed chunks of memory 
Helps you to deal with binary data
Deeply linked with stream
They are basically an array of bytes

```javascript
// Create a 1K buffer initialized with 0
const buf = Buffer.alloc(1024);

// Create a 1K uninitialized buffer
const buf2 = Buffer.allocUnsafe(1024);
```

`allocUnsafe` is faster but you have to be more careful when reading it.

```javascript
const buf = Buffer.from('Hola mundo');

console.log(buf[0]);
console.log(buf[1]);
console.log(buf[2]);
console.log(buf[3]);


console.log(buf.toJSON());
console.log(buf.toString());
```

Copy a buffer:

```javascript
const buf = Buffer.from('Contents');

// The length is 10 additoinal bytes
let copyBuf = Buffer.alloc(30);

buf.copy(copyBuf, buf.length);

console.log( copyBuf.toString() );
```

## Streams

Very much like pipes (`|`) in Unix
Streams are instances of `EventEmitter`
Since they process files by pieces ther are **faster** and **memory efficient**.

