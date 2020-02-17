---
title: Getting Started with React Material-UI
date: 2020-02-20
tags: javascript, materialui, css, react
---

# Getting Started with React Material-UI

So I wanted to learn [Material UI](https://material-ui.com/) since it seems to be the best way to use Material Design in a React Applications.

But the problem is that the official docs assume that you already are familiar with other UI frameworks for react and kind of point you to example projects instead of covering the basics on how to start a project using the toolkit.


So I decided to create my own documentation just for that and here it is.

## What is Material-UI ?

Well... Its just a bunch of React components styled using the [material design principles](https://material.io) that are ready to use.

If you want to start a React Project and don't want to get caught up in the details of styling you app, then Material-UI is just what you need.


## Create a react project and install Material-UI

This is very straight forward. We just need to...

- Create the project with `create-react-app`
- Install Material-UI to the project
- Add the Roboto Google font
- Clenaup files

Additionally (and recommended)

- Add the responsive meta-tag
- Reset the styles with [CssBaseline](https://material-ui.com/components/css-baseline/)


**Note* I'm using `yarn` instead of `npm` for installing packages and executing commands since its  faster. You can use `npm` without any problems.

### Create the react app and install Material-UI

You must know this by now. If not [read and follow the tutorial](https://reactjs.org/tutorial/tutorial.html)

```bash
mkdir react-material-ui-tutorial
cd react-material-ui-tutorial
npx create-react-app .
yarn add @material-ui/core
```

### Add the Robot Font and add the responsive meta-tag

Then open `public/index.html` with your browser and add the following lines before the closing of the `<head>` tag:

```html
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet" />
```

> We could bundle the font using the package `typeface-roboto` but we would increase the size of our bundle considerable. If you want to know more follow [this link](https://v3.material-ui.com/style/typography/#migration-to-typography-v2)


### Project cleanup

Now lets remove unneeded files in `src`, leaving only `index.js` and `App.js` in that dir.

```bash
rm src/{App.css,App.test.js,index.css,logo.svg,serviceWorker.js,setupTests.js}
tree src/
```

The `src/` directory should look like this:

```
$ tree src
src
├── App.js
└── index.js

0 directories, 2 files
```

### Refactor `App.js` and `index.js`

Then refactor `index.js` so it doesn't try to import the removed files. At the end it should look like this:

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

```

And finally. We should refactor `App.js` so it does not issue any errors:

```js
// src/App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>React material Tutorial</h1>
    </div>
  );
}

export default App;
```

![Image of the title Excercises](:storage/92b4a944-ba77-4622-bf31-6c216be5b7ac/a16f7d61.png)

Great now we can start adding Material-UI components

## Normalize or CssBaseline

If you've worked with a framework like Bootstrap, Bulma, Tailwind, etc. You've noticed that one of the first things they recommend is to use a CSS library like `normalize.css` or `reboot.css` to unify or resets the display of native controls.

Materia-UI has its own Control just for that and it called [CssBaseline](https://material-ui.com/components/css-baseline/).

Adding baseline could'nt be easier. Just import the component and add it in  `index.js`

```js {4,9-11}
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById('root'));
```

### What did we do?

- We imported `CssBaseline`
- We added it before the `<App />` component so it covers all of our application
- We wrapped everything in a fragment so React doesn't complain

That would render the following:

![Image of the styles changed](:storage/92b4a944-ba77-4622-bf31-6c216be5b7ac/04ea0171.png)

Its not much.. but now we have a base line (hence the name) for all the styles so they look the same **in all browsers**


## Adding some test content

Before we continue with our setup. Lets create some content in our app so we can actually see some changes. Lest add some button and some text in `App.js`:

```js {2,9-16}
// src/App.js
import React from 'react';
import { Button } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <h1>React material Tutorial</h1>
      <h2>This Could be a subtitle</h2>
      <p>And this is a paragraph</p>
      <Button variant="contained" color="primary">
        A Primary button
      </Button>
      <Button variant="contained" color="secondary">
        A Secondary button
      </Button>
    </div>
  );
}

export default App;

```

Which would render this:

![Some test content](:storage/92b4a944-ba77-4622-bf31-6c216be5b7ac/08fb48de.png)

With this basic content we can add some material magic and actually see the changes.

## Create a Theme

We're going to start by creating a theme.

But do not get intimidated. We're just going to change the primary and secondary button colors. This will give us an idea on how themes works in React.

The first step is to create a `theme.js` file and call [createMuiTheme](https://material-ui.com/customization/theming/#createmuitheme-options-args-theme) with our new theme parammeters.

```js
// src/theme.js
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00695c'
    },
    secondary: {
      main: '#c0ca33'
    },
    background: {
      default: '#fff'
    }
  }
});

export default theme;
```

And change `index.js` so the app supports themes:

```js {5,7,10,13}
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles'
import App from './App';
import theme from './theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'));
```

And we would have the following:

![Theme color changes](:storage/92b4a944-ba77-4622-bf31-6c216be5b7ac/0997487f.png)




## Change typography

Until now we haven't used Material-UI, we just setted up the project.

So lets start by changing the ugly font face in the H1 tag to use roboto. Just open `App.js` and add the following lines:

```js {3,10}
// App.js
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography'

function App() {
  const [excercises, setExcercises] = useState([]);
  const [title, setTitle] = useState('')
  return (
    <div className="App">
      <Typography component='h2' variant='h1' align='center' gutterBottom>
        Excercises
      </Typography>
    </div>
  );
}

export default App;

```

And that would render:

![Image of the new typography]()

Now we're starting to see the power of _Material-UI_... You get _ready to use_ components with all the Marial options you could ever need in you project.

If you head to the  [documentation](https://v3.material-ui.com/api/typography/), you can see that you have a miriad of options when it comes to just typhography and without the need of using intrincated clases or creating you own CSS.

## Creating forms

Now its time to create a form where we can register our excersises. lets start by bringing those components and then use them in `App.js`.

```js {4,13-15}
// App.js
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

function App() {
  const [excercises, useExcercises] = useState([]);
  const [title, useTitle] = useState('')
  return (
    <div className="App">
      <Typography component='h2' variant='h1' align='center' gutterBottom>
        Excercises
      </Typography>
      <form>
        <TextField name='title' label='excercise' margin='normal' value={title} />
      </form>
    </div>
  );
}

export default App;
```

Which renders

![Image of first impout field]()

Not bad... We created a form with just a text field that has some pretty animations when focused on.

The `TextField` as   component, has a lot of options. It would be wise to look at the [TextField documentation](https://v3.material-ui.com/api/text-field/).

## Paper

The idea behind Materia Design is to emulate how humans perceive materias with the use of shadows and layers.

So we have `Paper` which is a way to emulate a sheet of paper with elements over it.

We're going to use `Paper` to enclose our app and making it more organized.

```js {3,10,18}
// App.js
import React, { useState } from 'react';
import { Typography, TextField, Paper } from '@material-ui/core'

function App() {
  const [excercises, setExcercises] = useState([]);
  const [title, setTitle] = useState('')

  return (
    <Paper clssName='App'>
      <Typography component='h2' variant='h1' align='center' gutterBottom>
        Excercises
      </Typography>
      <form>
        <TextField name='title' label='excercise' margin='normal' value={title}
          onChange={e => setTitle(e.target.value)} />
      </form>
    </Paper>
  );
}

export default App;


```

Notice that we are including all the _Material-UI_ elements ant that now everthihng is inclosed in `<Paper>` instead of a `<div>`

![Image of the form enclosed in a card]()

## Buttons

And to finalize this first part, lets add a submit button to our form so we can have a way to send data to wherever we are going to send it.

## Other Tutorials

Additional Material-UI documentation is kind of scarce and there aren't many good tutorials that cover the basic. So here are a couple that you might want to check out:

- [A beginners guide to Material UI React tutorial \| Reactgo](https://reactgo.com/material-ui-react-tutorial/)
-
