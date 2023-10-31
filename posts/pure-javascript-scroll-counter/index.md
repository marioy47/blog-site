---
title: Create a Pure Javascript Scroll Counter
date: 2020-05-13
tags: [ javascript ]
---

# Create a pure Javascript Scroll Counter

![Javascript Counter in action](scroll-animated-counter.png)

I really don't know why my clients love to have animated counters in their pages. But the fact is that they do. And using a jQuery plugin or a custom library just for that is an over kill.

So this is an small counter that starts its count when the element with an special _counter class_ gets visible on a page.

Take into account that if you want to change its behavior, you have to tweak the code since I'm not interested in adding configuration options to it.

## The code

So here is the code.

```javascript
"use strict"

document.addEventListener("DOMContentLoaded", function() {
  // You can change this class to specify which elements are going to behave as counters.
  var elements = document.querySelectorAll(".scroll-counter")

  elements.forEach(function(item) {
    // Add new attributes to the elements with the '.scroll-counter' HTML class
    item.counterAlreadyFired = false
    item.counterSpeed = item.getAttribute("data-counter-time") / 45
    item.counterTarget = +item.innerText
    item.counterCount = 0
    item.counterStep = item.counterTarget / item.counterSpeed

    item.updateCounter = function() {
      item.counterCount = item.counterCount + item.counterStep
      item.innerText = Math.ceil(item.counterCount)

      if (item.counterCount < item.counterTarget) {
        setTimeout(item.updateCounter, item.counterSpeed)
      } else {
        item.innerText = item.counterTarget
      }
    }
  })

  // Function to determine if an element is visible in the web page
  var isElementVisible = function isElementVisible(el) {
    var scroll = window.scrollY || window.pageYOffset
    var boundsTop = el.getBoundingClientRect().top + scroll
    var viewport = {
      top: scroll,
      bottom: scroll + window.innerHeight,
    }
    var bounds = {
      top: boundsTop,
      bottom: boundsTop + el.clientHeight,
    }
    return (
      (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
      (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
    )
  }

  // Funciton that will get fired uppon scrolling
  var handleScroll = function handleScroll() {
    elements.forEach(function(item, id) {
      if (true === item.counterAlreadyFired) return
      if (!isElementVisible(item)) return
      item.updateCounter()
      item.counterAlreadyFired = true
    })
  }

  // Fire the function on scroll
  window.addEventListener("scroll", handleScroll)
})
```

As you can see is very short and in my opinion easy to understand. If you don't follow, read along...

## Explanation of the code

First of all, the code is enclosed in a `DOMContentLoaded` event listener. This is to make sure that we won't start looking for counters until the page html content is loaded. This is the equivalent of `$(document).ready()` function in _jQuery_.

Next, we'll parse the page, looking for the elements with the class `.scroll-counter` and in each found element will be doing the following:

- Read the **content** and making it the **finish** number
- Read the `data-counter-time` attribute to determine the **speed**
- Create the function `updateCounter` as an element attribute. This function will be in charge of animating the inner content so it works as a counter.

After we do all that with _each_ counter element, we create 2 additional functions in the page:

- A function called `isElementVisible` that determines if **an** element is visible in the page
- A function (`handleScroll`) that will get fired on each scroll action, that will look for all counter elements, and fire the counter action (using the previous function) for the ones that are visible.

Finally we create a `window` event listener for the `scroll` event.

## Usage

To make an element a counter you just need to add something like

```html
<span class="scroll-counter" data-counter-time="1000">150</span>
```

And it will count from 0 to 150 in about a second.

![Javascript Counter in action](scroll-animated-counter.gif)

Hope you found this short article useful ☺️
