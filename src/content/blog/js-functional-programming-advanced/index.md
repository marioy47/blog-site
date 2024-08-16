---
title: JavaScript Functional Programming - Advanced Topics
tags: [ javascript, functional, lambda, currying, composition ]
date: 2021-01-19
cover: ./lambda.png
---

In the previous articles we did a small [introduction and history of functional programming](/js-functional-programming-intro/) and we talked about some [basic concepts](/js-functional-programming-concepts/) regarding Functional Programming.

Now, we are going to discuss some functional programming patterns that allows you to achieve immutability and _composition_. Also, we'll discuss how to achieve loops **without running into errors** which is one of the main problems with functional programming.

## Currying

> Currying is the mean to transform a function of arity n to n functions of arity 1 - [@michelre](https://www.codementor.io/@michelre)

That sound very scary, doesn't it?

I assure you is not, but to understand currying, its better if we start with a basic pure function that adds two numbers.

```javascript
const addValues = (a, b) => {
  return a + b
}
console.log(addValues(6, 4))
```

Pretty straight forward, right? The output in the console would be:

```bash
$ node currying.js
10
```

That function is pure, but is not reusable in any way. So lets add some re-usability to that code by converting it into a _High Order Function_ like so:

```javascript {6}
const highOrderAdd = a => {
  return b => {
    return a + b
  }
}
console.log(highOrderAdd(6)(4))
```

Lets dissect what we did:

- We created a function `highOrderAdd` that receives **one** parameter, and returns an `anonymous` function
- The anonymous function receives **one** parameter and returns the sum of both parameters.

This is Currying!

The idea is that instead of having a function that receives **`n` arguments**, you create **`n` functions**, each one receiving **only `1` argument**. Let's do another example:

```javascript
// Instead of this
const addValues = (a, b, c, d) => a + b + c + d

// Do this
const highOrderAdd = a => b => c => d => a + b + c + d
```

Why would be this useful???

Well, we can reuse code this way. For instance, we could create a function that takes one number and sums 6 to it by using as base the `highOrderAdd` function:

```javascript
// Use case of highOrderAdd:
const addSix = highOrderAdd(6)
console.log(addSix(4))
```

In a way `addSix` is a **use case** for the `highOrderAdd` function.

Don't worry if you think that this is a waste of time and this just makes things more complicated. Read along about [composition](#composition) to see why this is useful.

## Composition

If you read the [first part of this series](/js-functional-programming-intro/#declarative-programming) you can see that I already touched on composition. But I didn't explain why it was useful.

Again, lets start with some conventional functional code:

```javascript {14-17}
// composition.js

// Functions
const safeCapitalize = str => {
  return str.toLowerCase().replace(/^.{2}/, c => c.toUpperCase())
}
const removeDoubleSpaces = str => {
  return str.replace(/ {2,}/g, " ").trim()
}
const addPoint = str => {
  return str.replace(/\.*$/, "") + "."
}

// Standard usage:
console.log(
  addPoint(removeDoubleSpaces(safeCapitalize(" THIS        is a string....")))
)
```

This will output.

```bash
$ node composition.js
This is a string.
```

As you can see in the `console.log` section at the end, this can become problematic. Just making sure that all parenthesis are accounted for can be a headache!

Now, you might say: _"Why don't you just save the out put of each call on a variable?"_.

There are 2 problems with that approach:

- You might end up with a lot (and I mean A LOT) of variables in your program.
- You might violate the principle of **immutability** by overwriting variables values.

And this is where [Currying](#currying] starts to make sense. With the help of **higher order functions**, we can solve this issue with a new function that we'll _cleverly_ call `compose`:

```javascript {13-15,17-22}
// Functions do not change
const safeCapitalize = str => {
  return str.toLowerCase().replace(/^.{2}/, c => c.toUpperCase())
}
const removeDoubleSpaces = str => {
  return str.replace(/ {2,}/g, " ").trim()
}
const addPoint = str => {
  return str.replace(/\.*$/, "") + "."
}

// Composition function
const compose = (...fns) => arg => {
  return fns.reduce((composed, fn) => fn(composed), arg)
}

// Using composition with currying
compose(
  safeCapitalize,
  removeDoubleSpaces,
  addPoint,
  console.log
)(" THIS        is  ANOTHER string....")
```

Isn't this cleaner and **declarative**???

The end result is exactly the same. Only that now you can see very clearly **what** (not how) the code is doing just by reading the function names.

The `compose` function takes functions as arguments (we use here the spread operator for that), and returns a single function that receives one argument.

Also, here you can see that _currying_ can be useful since all the functions (except `compose`) require that **only one parameter be passed**.

## Loops with recursion

**Note: _Tail Call Optimization_ no longer works in Node. Right now long recursion calls will give you a `RangeError: Maximum call stack size exceeded` always**

The last pattern we'll discuss is recursion. Which is an essential part of _Functional Programming_ since the use of loops like `for` and `while` is discouraged because they are not _Declarative_ nor they are _Immutable_ (the loop control variable has to be overwritten on each iteration).

The idea is to make use of [Lazy Evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation), which in JavaScript is represented as _Tail Call Optimization_, to prevent _call stack range errors_.

This time we're going to take some code that is already _Functional_ but we are going to point out an issue it has:

```javascript {4}
// recursion.js
const sum = n => {
  if (n === 0) return 0
  return n + sum(n - 1)
}
console.log(sum(100))
```

This is a simple recursion that sums the numbers from `1` to `n`. So if I where to call this function with `n = 100`, I would get in the console `5050`.

So far so good.

The problem lies in the `return` statement: The function is written in a way where **before returning the current value, the function `sum` has to call upon itself again with the next value**.

So I where to call this function with the `n = 100000` I would get this:

```bash
const sum = (n) => {
             ^

RangeError: Maximum call stack size exceeded
```

In plain English, what this error points out is that you filled the [call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_Stack) of the interpreter before returning the last value. This issue can be solved by using [Tail Call Optimization](https://www.techopedia.com/definition/22458/tail-call-optimization).

> _Tail Call Optimization_ is not supported by all node versions.

To solve this issue, we need to rewrite the function in a way where the function not only receives the next value, but the **current accumulated result** so it doesn't have to wait for the next return to execute.

This sound complicated, but is really easy:

```javascript {3}
const sumAccum = (n, accum = 0) => {
  if (n === 0) return accum
  return sumAccum(n - 1, n + accum)
}
console.log(sumAccum(100))
```

Two things to notice here:

- The function now receives the current iteration value (`n`) **and** the current accumulated value `accum`
- Before the next iteration is called in the `return` line, we first **execute the computation** (which is `n + accum` in the example).

This 2 changes prevents the call stack to get filled since were doing our computation **before** the next operation and not after.

## Final toughs

[Rémi Michelre](https://github.com/michelre) wrote 2 great articles about [currying](https://www.codementor.io/@michelre/currying-in-javascript-g6212s8qv) and [composition](https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj). I highly suggest you take a look at them if you still have any doubts on those 2 concepts.

Also, there is a great explanation on the problems with recursion in [this Jeremy Fairbank talk](https://www.youtube.com/watch?t=2723&v=FYXpOjwYzcs&feature=youtu.be) in YouTube (timestamp in the link).
