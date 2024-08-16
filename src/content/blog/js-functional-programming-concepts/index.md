---
title: JavaScript Functional Programming - Concepts
tags: [ javascript, functional, lambda, currying, composition ]
date: 2020-11-22
cover: ./lambda.png
---

In the [first part of this series](/js-functional-programming-intro/), I explained what Functional Programming was all about, gave a little history lesson, talked about Imperative vs Declarative programming, and made a case about JavaScript being a (non exclusively) functional programming.

Now I want to go a little deeper by explaining the core concepts of functional programming and what this "philosophy" looks for.

Just a little heads up... This is part of the series is very conceptual even tough I'll be using examples trough and trough. Still, its kind of important to be this conceptual if you want to write better software.

## Immutability

When we say that functional programming **looks for** immutability, we're saying that data structures are not changed (by functions) instead new copies of the data are returned.

> As I said in the first part functional programming is a style of development, not a tool or a set of rules. That's why I use the words **looks for**.

In the _Declarative Programming_ example ([in the previous article](/js-functional-programming-intro/#imperative-vs-declarative-programming)) you could have seen that we only required constants and that we didn't need to overwrite any value.

Lets use an example where we use _mutable_ function and an _immutable_ one.

```javascript
// immutability.jrs

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

```
Example mutable: { name: 'Carlos', age: 20 } { name: 'Carlos', age: 20 }
Example immutable:: { name: 'Mario', age: 15 } { name: 'Mario', age: 25 }
```

If you look closely to the `mutableAge` function, you can see that it receives an object called `person`, and then **changes** an element of that object. So at the end the object `person` changes.

In `immutableAge` we copy the `person` object using `Object.assign` so the original `person` doesn't get changed.

We can rewrite the `immutableAge` function in ES6 like this:

```javascript
const immutableAge = (person, newAge) => ({ ...person, age: newAge })
```

> Use the spread operator in objects **and** array to make new copies.

It's like JavaScript 6 (ES6) wanted us to use _functional programming_... Right ? 😉

## Purity

A pure function is a function that

- Takes at least 1 argument and always return something: A value or another function.
- The returned values are obtained by computing the input values and not by external events or `static` variables.
- They do not use (for reading or writing) global variables or global states.
- The input values are not changed (when passing by reference for instance)

As a consequence, they are very _testeable_ since there is no need of _set up_ or _tear down_ procedures.

```javascript
// purity.js

let exampleVariable = "";

const notPureFunction = (name) => {
  exampleVariable = "Hello " + name;
  return "Function finished";
};

const pureFunction = (name) => {
  return "Hello " + name;
};
```

For instance, the first function from the example... If you wanted to test it out, you would need to create a `setUp` procedure where the variable `exampleVariable` should get initialized or at least declared.

On the other hand. The second function only requires you to pass an argument to the test procedure.

## Higher order functions

I already talked about this in the first part. _Higher Order Functions_ are functions that **can manipulate other functions** either by receiving a function as an input parameter, output a function as a result value... Or both.

```javascript
// higher-order-functions.js
const traditionalSum = (a, b) => a + b
const higerOrderSum = a => b => a + b

console.log("Traditional:", traditionalSum(5, 6))
console.log("Higer order:", higerOrderSum(5)(6))
```

You can see how the `higerOrderSum` returns a function.

In the next part of this series, I'll explain _Currying_ as a way to take a higher order function and re-use its logic for a particular use case or value.

## Recursion

On imperative programming, you'll see the `for` loop used all the time. This is the preferred way of doing repetitive tasks.

There is nothing wrong with that, but on a `for` loop you are almost always **updating the value of a variable**. And we already said that functional programming looks for immutability.

There are loops like `while` or `do` but _functional programming_ has a different solution: **recursion**.

Recursion basically means to call a function on it self until a value accomplishes certain criteria.

```javascript
// recursion.js

// Imperative
for (let i = 0; i < 5; i++) {
  console.log("For loop:", i);
}

// Declarative
const forLoop = (counter, max) => {
  if ( counter < max) {
    console.log("Recursion:", counter);
    return forLoop(counter + 1, max);
  }
};
forLoop(0, 5);
```

And the output will be:

```
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

Now, **be very careful with recursion**, specially on large loops. It has to be done right. Otherwise you'll get a [Stack Size Limit](https://www.freecodecamp.org/news/understanding-the-javascript-call-stack-861e41ae61d4/) error on your projects or make your software slower because you are first creating a stack of calls instead of actually evaluating the result.

But there are ways to avoid this errors and actually make our code faster by following a few patters that we'll look on the next section of this series.

## Final toughs

On the [first part](/js-functional-programming-intro/) of this series, we explained what functional programming is and determined that JavaScript had functional programming capabilities. In this part we introduced some concepts of _pure_ functional programing and how they get implemented in JavaScript. On the [final part](/js-functional-programming-advanced/) we'll see some functional programming patterns like _composition_ and _currying_ and the benefits of using them.
