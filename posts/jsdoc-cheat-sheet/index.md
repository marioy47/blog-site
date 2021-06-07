---
title: JSDoc introduction and cheat sheet
cover:
date: 2021-06-05
tags: javascript, jsdoc, development
---

# JSDoc Introduction and cheat sheet

Lately, I've working on a JavaScript project where the original code was written by other developers a couple of months ago, and the project is actually kind of large.

The original code is very well put together and does what it's supposed to do very well I might add.

The problem is that because I came into the project late, every time I try to add a new functionality or change some behaviour I have to ask to another developer almost always the same question: **What does this function do?** or **What kind parameters does this function needs?**, specially when the parameters are objects.

The problem is that the code is not documented so I find myself hunting down the function declarations and reading the code of the function to find out what type of parameters the function needs.

So I took upon my self to document the project with [JSDoc](https://jsdoc.app/) which is the standard of JavaScript documentation.

Here is an small introduction to _JSDoc_ and a small _Cheat Sheet_ with the most common directives.

## TOC

```toc

```

## JSDoc

So, as I said before, _JSDoc_ is the standard for JavaScript code documentation. With it you can an achieve 2 very practical things:

- You get an static website, I mean actual HTML files, with all the code documentation for a project
- In-line documentation with you IDE. In other words, the IDE will tell you what the function does and what it needs when you hover over it.

What sold me on _JSDoc_ from the very beginning was the second item. Have in-line documentation of every variable, function or class:


![JavaScript function with no JSDoc documentation](no-documentation-hover.png)

 _Hovering over a JavaScript function with no JSDoc documentation_

Notice how when I hover the mouse over the function `testFunction`, the IDE (in this case NeoVim) only tells you the obvious. That there are 3 parameters and that the last one is optional.

Compare that with the following:

![JavaScript function](documented-func-hover.png)

_Hovering over a JavaScript function that has JSDoc documentation_

As you can see, I get the information on the function, the number **and type** of parameters and the return value of the function by just hovering it.

This way, every time I need to find which parameters a function needs or what does a function do, I just have to hover over the function in [Visual Studio Code](https://code.visualstudio.com) or press `Shift+k` on NeoVim to get the function documentation and an explanation of the parameters.

## How to document an element

As with Java, to document a function, variable or class. You just have to create a comment before the element you want to document. The only thing you have to keep in mind is that the comment needs to start with `/**` and end with `*/`, like so:

```javascript
/**
 * This is a JSDoc comment
 * ...
 */
function myFunc() {
  // ...
}
```

That will tell the IDE (and the `jsdoc` command line) that this is an special comment.

## Documenting parameters

We already saw that to document an _element_ (function, variable, class, etc.) you just have to add a **special** comment before the element. 

Now let's see how to document function parameters with the `@para` directive. Take the following function for instance:

```javascript
/**
 * This is the test function.
 *
 * @para {String} name - This it the `name` parameter
 * @para {Number} [age=21] - This is the `age` parameter
 */
function myFunction(name, age = 21) {
  console.log(`Parameter 1 is ${name} and Parameter 2 is ${age}`);
  return true;
}
```

- Each parameter requires a `@param` directive in the comments
- After `@param` comes the **type** of the variable between brackets and  an **optional dash** and then the **explanation** or additional comments
- Optional parameters names are enclosed between `[` and `]`
- The default values are added using `=value` next to the variable name

## Object parammeters

Let's say that we have the following function:

```javascript
function requieresAndObject(obj1) {
  obj1.city = 'undefined' === typeof obj1.city ? 'Medellín' : obj1.city;
  console.log(`The name is ${obj1.name}. The age is ${obj1.age}. And the city ${obj1.city}`);
}
```

Notice that the function receives an object. That the object requires a `name` and an `age` values. And if the `city` value is not passed, the value `Medellín` is assigned to it.

How do you document that `obj1` **object** parameter?... Well, pretty simple:

```javascript
/**
 * Function with an object parameter
 *
 * @para {Object} obj1 This explains that the parameter is an object
 * @para {String} obj1.name This explains there should be a `name` value on the object
 * @para {Number} obj1.age This explains that there should be an `age` value
 * @para {Number} [obj1.city=Medellín] And the **optional** 3rd parameter can be also documented.
 */
function requieresAndObject(obj1) {
  obj1.city = 'undefined' === typeof obj1.city ? 'Medellín' : obj1.city;
  console.log(`The name is ${obj1.name}. The age is ${obj1.age}. And the city ${obj1.city}`);
}
```

## Documenting return values

## Documenting Exceptions

## Documenting types with `@typedef`

## Using inline options lie `{@see https...}`

## Creating tutorials and examples

## Support Video

https://www.youtube.com/watch?v=U329pKWKqWw

Documentation: https://jsdoc.app/about-configuring-jsdoc.html
