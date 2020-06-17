---
title: Framer Motion for React Intro
date: 2020-12-12
cover:
tags: react, framer motion, javascript, npm
---

# Framer Motion for React Intro

Animation for transitions and react components like hover and click

Very simple and succinct syntax

The webpage has a playground

You can animate SVG's too

Also includes popups

## Installation

- Clone repo: https://github.com/iamshaunjp/framer-motion/tree/lesson-2/pizzajoint

```bash
pnpx create-react-app framer-motion-tutorial
cd $_
npm install react-router-dom framer-motion
```

## Basic app

- App
  - Router
    - Home
    - Base
    - Toppings
    - Order

The _state_ resides in App.

The functions to add toppings and base are passed as props. Also the pizza where the base and toppings reside.

## Basics of Frame Motion

The basic syntax is `motion.element`

`animate` prop that receives an object

```javascript
import {motion} from 'framer-motion';

const App = () => {
    return (
        <motion.h2 animate={{fontSize: 50}, color: `#ccc`, x: 100, y: -200, scale: 1.5 }>
            This is a test
        </motion.h2>
    );
}
```

The properties `scale`, `x` and `y` are from `framer motion` only

By default the animations are trigger on page load

`rotateZ`

## Set initial states

```javascript
import { motion } from "framer-motion"

const Header = () => {
  return (
    <motion.div initial={{ y: -250 }} animate={{ y: -10 }}>
      This is the content
    </motion.div>
  )
}
```

When we say `y: 0`. We're saying _Move the object 0 pixels from it's ORIGINAL position_ So in that case we're not moving it at all.

```javascript
import { motion } from "framer-motion"

const Header = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      This is the content
    </motion.div>
  )
}
```

## Transition options

```javascript
import { motion } from "framer-motion"

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 2, type: `tween`, stiffness: 50 }}
    >
      This is the content
    </motion.div>
  )
}
```

Other animations are `spring`
Stiffeness if for spring only

## Hover effects

```javascript
import { motion } from "framer-motion"

const Header = () => {
  return (
    <motion.button
      whileHover={{
        originX: 0,
        scale: 1.1,
        textShadow: `0px 0px 8px rgba(255,255,255,.5)`,
        boxShadow: `0px 0px 8px rgba(255,255,255,.5)`,
      }}
    >
      This is the content
    </motion.button>
  )
}
```

##
