---
title: JavaScript Advanced Concepts
tags: javascript, object oriented programming, class, lambda
---

# JavaScript Advanced Concepts

## Lambda functions _Gotchas_

https://www.vinta.com.br/blog/2015/javascript-lambda-and-arrow-functions/

### The `this` object does **not** references the current function

So maybe the is more a regular `function()` gotcha instead of a _lambda_ gotcha.

One thing that made JavaScript developers shoot themselves in the foot, is the fact that in regular functions, the `this` object points to the function itself and not the parent (the documentation talk about context, but let's not go there). This is more obvious when using classes. Take the following code:

```javascript {5}
class WithFunctions {
    outer() {
        this.value = 50;
        const innerFunction = function() {
            this.value = 100;
        }
        innerFunction();
        console.log(this.value);
    }
}
const instance = new WithFunctions();
instance.outer();
```

If we run this code, well get the following error:

```bash
user@machine$ node example1.js
/home/mario/tests/example1.js:5
            this.value = 100;
                       ^
TypeError: Cannot set property 'value' of undefined
```

The problem is line 5. The `this` object points to `innerFunction()` (In JavaScript functions are objects) and not to the class object. 

This can easily be solved by using lambda functions like so:

```javascript {4}
class WithLambda {
    outer() {
        this.value = 50;
        const innerFunction = () => {
            this.value = 100;
        }
        innerFunction();
        console.log(this.value);
    }
}

const instance = new WithLambda();
instance.outer();
```

Since in Lambda functions there is no `this` object, in line 5, when we use `this`, we are referring to the class object!.

### In lambda functions `call()`, `bind()` and `apply()` won't work

This is **not** a drawback, but something to remember. Is that `call()`, `bind()` and `apply()` do not work with lambda functions, and they shouldn't need to. This 3 functions where created to solve the issue of `this` changing when you used functions inside functions like we just saw.

### There is no `arguments` variable

In regular functions you can have something like this:

```javascript
function testFunc() {
    console.log(arguments);
}
testFunc(1, 2, 3);
```

And it will output something like 

```bash
[Arguments] { '0': 1, '1': 2, '2': 3 }
```

But! If you do something like this:

```javascript
```

You'll get

```bash
[Arguments] {
  '0': {},
  '1': [Function: require] {
    resolve: [Function: resolve] { paths: [Function: paths] },
    main: Module {
      id: '.',
      path: '/home/mario/tests',
      exports: {},
      filename: '/home/mario/tests/arguments.js',
      loaded: false,
      children: [],
      paths: [Array]
    },
    extensions: [Object: null prototype] {
      '.js': [Function (anonymous)],
      '.json': [Function (anonymous)],
      '.node': [Function (anonymous)]
    },
    cache: [Object: null prototype] {
      '/home/mario/tests/arguments.js': [Module]
    }
  },
  '2': Module {
    id: '.',
    path: '/home/mario/tests',
    exports: {},
    filename: '/home/mario/tests/arguments.js',
    loaded: false,
    children: [],
    paths: [
      '/home/mario/tests/node_modules',
      '/home/mario/node_modules',
      '/home/node_modules',
      '/node_modules'
    ]
  },
  '3': '/home/mario/tests/arguments.js',
  '4': '/home/mario/tests'
}
```

Wha


Since object deconstruction was introduced in JavaScript at the same time as lambda functions, there was no need to keep the `arguments` variable available on landa.



- You have to use `(` and `)` on _oneliners_ when returning object literals

## Call, Apply and Bind

https://www.youtube.com/watch?v=c0mLRpw-9rI

- First of all, functions are objects in JavaScript
- Using `call`, `apply` and `bind` allows you to use external method on already created objects
- They are part of the `Function` prototype. So its available on all functions
- Receives a _context_ object as the first parameter

```javascript {4,7}
const obj1 = { num: 2 }

const addFunction = function (arg) {
  return this.num + arg
}

const res = addFunction.call(obj1, 3)
console.log(res)
```

And the output of this script would be `5`

Notice how in line 4 we are using `this` but in line 7 we are telling the function that `this` makes reference to **another object**.

This is the basic principle, what changes between `call`, `apply` and `bind` is the usage method.

### Call

A more complete example would be:

```javascript {7}
const obj1 = { num: 2 }

const addFunc = function (arg1, arg2, arg3) {
  return this.num + arg1 + arg2 + arg3
}

const res = addFunc.call(obj1, 1, 2, 3)

console.log(res)
```

With the result `8`.

### Apply

Pretty similar to `bind` the only difference is that you pass the arguments as an array:

```javascript {7}
const obj1 = { num: 2 }

const addFunc = function (arg1, arg2, arg3) {
  return this.num + arg1 + arg2 + arg3
}

const res = addFunc.apply(obj1, [4, 5, 6])

console.log(res)
```

### Bind

```javascript {7}
const obj1 = { num: 2 };

const addFunc = function(arg1, arg2, arg3) {
    return this.num + arg1 + arg2 + arg3;
}

const res = addFunc.bind(obj1, 4, 5, 6);

console.log(res);
```

And the result of executing this code would be:

```bash
$ node bind-example.js

[Function: bound addFunc]
```

It returns an object instead of the result!

The correct way to call this new result would be:

```javascript {9}
const obj1 = { num: 2 };

const addFunc = function(arg1, arg2, arg3) {
    return this.num + arg1 + arg2 + arg3;
}

const res = addFunc.bind(obj1, 1, 2, 3);

console.log(res()); // Called as a function
```

## Template literals

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

- Called differently myTemplate`Content of the function`;

### Object.prototype.hasOwnProperty.call

## Object.prototype

## Proxy class

## Object.freeze
