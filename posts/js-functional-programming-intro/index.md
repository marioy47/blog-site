---
title: JavaScript Functional Programming - Introduction
tags: javascript, functional, lambda, currying, composition
date: 2020-11-07
cover: lambda.jpg
---

# JavaScript Functional Programming: Introduction

As with fashion, in programming there are trends that come and go. Some have die hard fans, sometimes this trends are just hype and never get used... And some times they reappear.

You could say that functional programming is one of those trends... Please don't get mad at me for saying that, I'm just trying to make a point.

The point being that functional programming is NOT THE way to develop, nor its a new technology. Functional programming its just a way to develop that has great benefits and some caveats.

Recently, with the advent of [React Hooks](https://reactjs.org/docs/hooks-intro.html), it seems that Functional Programming is again in the spotlight. So let's take a look at what does it mean that JavaScript is functional and what are the benefits.

This is the first part of a small mini series where I'll be discusins functional programning in JavaScript. [On part 2](/js-functional-programming-concepts) I'll dig deeper on the core concepts of functional programming. An [in part 3](/js-functional-programming-patters) I'll introduce some programming patterns that can be used with functional programming like [Composition](https://en.wikipedia.org/wiki/Function_composition_%28computer_science%29) and [Currying](https://en.wikipedia.org/wiki/Currying).

## TOC

```toc

```

But first, some history.

## The beginnings of functional programming

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

## Some words about React

If after reading all of this you are wondering if this is actually useful. So let's look at React and how it uses JXS to represent content in the DOM:

```javascript
// react-declarative-jsx.js
import React from "react"
import ReactDOM from "react-dom"

const HelloWorld = () => {
  const [msg, setMsg] = useState("Hello World");
  return (
    <div className="container">
      <h1>{setMsg}</h1>
    </div>
  )
}
ReactDOM.render(<HelloWorld />, document.getElementById("root"))
```

Right of the bat, you can see that the code is very declarative. It's very obvious what it should be outputted with out analyzing step by step how it does it.

And to top it, since React introduced hooks in version 16, they did added a _declarative_ way to manage state in the framework (I know is not a framework but it almost is).

So if you are a React developer, you should have a good grasp of functional programming. It not only allow you to understand the code better, but it will make you code better at the end.

[On part 2 of this mini series](/js-functional-programming-concepts) I'll be going over composition and currying a little deeper so you can start using them in your programs.

Finally, you can browse the code in this blog on [this GitHub repo](https://github.com/marioy47/js-functional-programming)

