---
title: JavaScript Functional Programming - Introduction
tags: javascript, functional, lambda, currying, composition
date: 2020-11-07
---

# JavaScript Functional Programming: Introduction

As with fashion, in programming there are trends that come and go. Some have die hard fans, sometimes this trends are just hype and never get used... And some times they reappear.

You could say that functional programming is one of those trends... Please don't get mad at me for saying that, I'm just trying to make a point.

The point being that functional programming is NOT THE way to develop, nor its a new technology. Functional programming its just a way to develop that has great benefits and some caveats.

Recently, with the advent of [React Hooks](https://reactjs.org/docs/hooks-intro.html), it seems that Functional Programming is again in the spotlight. So let's take a look at what does it mean that JavaScript is functional and what are the benefits.

```toc

```

But first, some history.

## History

Let's start by saying that functions have been a part of calculus since the 17th century. And if you went trough high school, you might have seen something like

```text
f(x) = y
```

That's a way to represent a function (`f()`). Something that receives an input (`x`), and generates an output (`y`). And that what functions are... Something that receives zero or more parameters and returns a result!

Well, in 1930 Alonzo Church, at Princeton University, invented _lambda calculus_ or [λ-calculus](https://brilliant.org/wiki/lambda-calculus/) while experimenting with _higher order functions_.

Higher-order functions are functions that can manipulate other functions and use them either as arguments, results or both. This is important, well see why latter.

Then, in the late 1950's, John McCarty took the concepts derived from λ-calculus and applied them to a new programming language called [Lisp](https://lisp-lang.org/).

In Lisp, functions are a _first-class citizens_. Which means that function can be **declared as variables** and send to functions **as a parameters**. They can even be the **return** of a function (functions than when executed returns another function).

## Is JavaScript a "functional language"?

JavaScript its a (non exclusively) functional programming language because in JavaScript functions are _first-class citizens_.

But what does it mean that _functions are first class citizens_?

### 1. Variables can be functions

```javascript {2}
// functions-as-vars.js
const varFn = function(message) {
  return console.log("Hello " + message)
}
varFn("lambda function")
```

Will return

```text
Hello lambda function
```

Here the variable `varFn` its actually a function.

### 2. Functions can be added to objects like variables

```javascript {4}
// functions-in-objects.js
const obj = {
  prefix: "Hello",
  showMessage(message) {
    console.log(this.prefix + " " + message)
  },
}
obj.showMessage("World")
```

Will print

```text
Hello world
```

They work very similar to classes, but if you look closely, you can see that we added the function to the object while creating the object. We didn't need to create a _Class_ and then instantiate it with `new`.

### 3. Functions can be sent as parameters

```javascript {8}
// functions-as-parameters.js
function executeLogger(loggerFunction) {
  loggerFunction("Inside function as param")
}
function logger(message) {
  console.log("Hello - " + message)
}
executeLogger(logger)
```

Will output

```text
Hello - Inside function as param
```

Here `executeLogger` is a higher order function. It receives functions as parameters.

Told you that it was important, didn't I? 😉.

### 4. Functions can return functions

```javascript {6-8}
// functions-ret-functions.js
const loggerFn = function(message) {
  console.log(message)
}
const toUpperFn = function(logger) {
  return function(message) {
    logger("The message is: " + message.toUpperCase())
  }
}
// `loggerToUpperFn` receives a function than can be executed
const loggerToUpperFn = toUpperFn(loggerFn)
loggerToUpperFn("hola mundo")
```

Will output

```text
The message is: HOLA MUNDO
```

If you are familiar with ES6. You can infer that this last snippet can be rewritten like this:

```javascript
// functions-ret-functions-es6.js
const toUpperFn = logger => message =>
  logger("The message is: " + message.toUpperCase())

toUpperFn(message => console.log(message))("hola mundo")
```

## Imperative vs Declarative programming

Good, we now know some principles of _functional programming_ and how they get implemented in JavaScript. But we still don't know how to use them to write better programs.

For that we have to make the distinction between Imperative vs Declarative programming.

### Imperative programming

_Imperative Programming_ focuses on explaining which steps should happen to get a result. In other words, it focuses on **how** things should happen. It can be said that this is the traditional way of creating software.

```javascript
// imperative-programming.js
const message = ["this is", "imperative programming", "!"]
let transformed = ""
for (let i = 0; i < message.length; i++) {
  let item = message[i].toUpperCase()
  item = item.replace(/ /g, "-")
  transformed = transformed + "-" + item
}
console.log(transformed)
```

Will output

```text
-THIS-IS-IMPERATIVE-PROGRAMMING-!
```

In the previous code, you can see **how** the code gets to the result. Each step is clear an concise, but is not clear _what_ **each step** achieves. Only after going trough the whole code is clear what we've done.

### Declarative Programming

_Declarative Programming_ in the other hand, is a style of programming where applications are structured in a way that prioritizes **what should happen** (given that you use clear function names).

**Functional programming is part of declarative programming**.

If we where to rewrite that previous code declaratively, we should do something like:

```javascript {11}
// declarative-programming.js
const _ = require("lodash")

const upper = msg => msg.toUpperCase()
const hyphenize = msg => msg.replace(/ /g, "-")
const append = msg => acc => acc + "-" + msg

const message = ["this is", "DECLARATIVE programming", "!"]

const transformed = message.reduce((item, accum) =>
  _.flow(upper, hyphenize, append(accum))(item)
)

console.log(transformed)
```

> Right now is not important to understand the code. The important thing is to show how the code is written.

The previous code will output:

```text
THIS-IS-DECLARATIVE-PROGRAMMING-!
```

Now, this may seem like an overkill since we're doing very little logic and we actually had to import the [Lodash](https://lodash.com/) library so I could use the [`flow`](https://lodash.com/docs/4.17.15#flow) function.

The _declarative_ in _declarative programming_ is in the 10th line:

```javascript
_.flow(upper, hyphenize, append(accum))(item)
```

It's basically telling us **what** the code does:

- Execute the following steps sequentially (that's what `_.flow` is for)
- First make each component uppercase
- Then convert spaces into hyphens
- Then append it to the what was already created (accumulated)

So you can see **what** the code does, but no _how_ it does it. That's almost the definition of declarative programming.

## Why use functional programming?

You might be thinking from the previous example that functional programming just makes thing harder since you have to think **what** the code should do before actually writing.

And you might not be completely wrong.

Functional programming forces you to think MORE before writing your software. But that could be taken as a good thing.

Additionally there are good reasons to use functional programming:

- Since we only use functions, not state, the software is less prone to errors
- Functions are very easy to test
- There is no _set up_ or _tear down_ step when using a testing library
- Your can reuse more code, after all that's what functions are for
- \*Your software is more efficient

That last one is a little controversial since it depends on the developer, and is NOT ALWAYS TRUE. Actually, Functional programming can be more inefficient and memory intensive if you are not careful.

## Functional programming core concepts

So we've seen the differences between Imperative and Declarative programming. Now lets dig deeper on what functional programming looks for.

### Immutability

Data structures are not changed (by functions) instead new copies of the data are returned.

In the _Declarative Programming_ example (the previous example) you could have seen that we only required constants and that we didn't need to overwrite any value.

Here is an example of mutability and immutability.

```javascript
// immutability.js
const mutableAge = function(person, newAge) {
  person.age = newAge
  return person
}

const immutableAge = (person, newAge) => {
  return Object.assign({}, person, { age: newAge })
}

const dev1 = { name: "Carlos", age: 10 }
const copy1 = mutableAge(dev1, 20)

const dev2 = { name: "Mario", age: 15 }
const copy2 = immutableAge(dev2, 25)

console.log("Example mutable:", dev1, copy1)
console.log("Example immutable::", dev2, copy2)
```

This will output:

```text
Example mutable: { name: 'Carlos', age: 20 } { name: 'Carlos', age: 20 }
Example immutable:: { name: 'Mario', age: 15 } { name: 'Mario', age: 25 }
```

Obviously the second function is the immutable one and the type of function we should use on functional programming.

We can rewrite the `immutableAge` function like this:

```javascript
const immutableAge = (person, newAge) => ({ ...person, age: newAge })
```

> Use the spread operator in objects **and** array to make new copies.

It's like JavaScript 6 (ES6) wanted us to use _functional programming_... Right ? 😉

### Purity

A pure function is a function that

- Takes at least 1 argument and always return something: A value or another function.
- The return a values are obtained by computing the input values and not by external events or `static` variables.
- They do not use (for reading or writing) global variables or global states.
- The input values are not changed (when passing by reference for instance)

As a consequence, they are very _testeable_ since there is no need of _set up_ or _tear down_ procedures.

### Data transformation

This "rule" is easy to understand, but hard to implement, specially if you are used to imperative programming.

But take the following example:

```javascript
// data-transformation.js
const original = ["medellin", "bogotá", "cali", "barranquilla"]

const capitilized = original.map(item => item.toUpperCase())
const filtered = original.filter(item => item.substr(0, 1) < "c")
const cities = original.reduce((item, acc) => item + acc + ", ", "")

console.log("Capitalized:", capitilized)
console.log("Filtered:", filtered)
console.log("Cities:", cities)
console.log("Original:", original)
```

See how the original data is not changed?

If you use _functional functions_ (I just made that up) like `map`, `reduce`, `filter`, `reduceRight`, etc. You are almost guaranteed to not transform any data.

Right of the bat, you can see how data transformation can become a burden if you have to create a new variable for each step. And how this can be memory intensive if you have a lot of data (told you there where some caveats).

To solve this, there is recursion and composition. But those are some advanced topics that I'll be covering in a future article.

### Higher order functions

I already talked about this... This are functions that **can manipulate other functions**.

But in this part, lets take it a bit further.

```javascript
// higer-order-functions.js
const traditionalSum = (a, b) => a + b
const higerOrderSum = a => b => a + b

console.log("Traditional:", traditionalSum(5, 6))
console.log("Higer order:", higerOrderSum(5)(6))

const sumFive = higerOrderSum(5)
console.log("Currying", sumFive(6))
```

You can see how the `higerOrderSum` returns a function.

Now, the interesting part is the last 2 lines. I use the `higerOrderSum` to create a new function called `sumFive`... I'm **reusing the logic of the function for a particular use case**.

This is what **currying** is all about, and as recursion, I'll talk about this in a further article.

### Recursion

On imperative programming, you'll see the `for` loop used all the time. This is the preferred way of looping trough a list of items.

There is nothing wrong with that, but on a for loop you are almost always **updating the value of a variable**.

There are loops like `while` or `do` but _functional programming_ has a different soution: **recursion**.

Recursion basically means to call the function on it self until a value accomplishes certain criteria.

```javascript
// recursion.js
for (let i = 0; i < 5; i++) {
  console.log("Foor loop:", i)
}
const forLoop = (value, max, fn) => {
  if (value < max) {
    fn(value)
    return forLoop(value + 1, max, fn)
  }
  return value
}
forLoop(0, 5, val => console.log("Recursion:", val))
```

And the output will be:

```text
Foor loop: 0
Foor loop: 1
Foor loop: 2
Foor loop: 3
Foor loop: 4
Recursion: 0
Recursion: 1
Recursion: 2
Recursion: 3
Recursion: 4
```

So we get the same result but with a big difference, we can reuse the functional code since `forLoop` receives a function.

And if we make the function call on itself only when a process has finished, we'll be handling asynchronous process pretty easily.

## Some words about React

If after reading all of this you are wondering if this is actually useful lets look at react.

React uses JXS to represent content in the DOM:

```javascript
// react-declarative-jsx.js
import React from "react"
import ReactDOM from "react-dom"

const HelloWorld = () => {
  return (
    <div className="container">
      <h1>Hello World</h1>
    </div>
  )
}
ReactDOM.render(<HelloWorld />, document.getElementById("root"))
```

Right of the bat, you can see that the code is very declarative. You see right away what it should output with out analyzing step by step how it does it.

And to top it, since React introduced hooks in version 16, they did added a _declarative_ way to manage state in the framework (I know is not a framework but it almost is).

So if you are a React developer, you should have a good grasp of functional programming. It not only allow you to understand the code better, but it will make you code better at the end.

On part 2 of this mini series I'll be going over composition and currying a little deeper so you can start using them in your programs.

Finally, you can browse the code in this blog on [this GitHub repo](https://github.com/marioy47/js-functional-programming)
