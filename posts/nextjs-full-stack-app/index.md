---
title: Create a NextJS App
date: 2021-02-28
cover:
tags: nextjs, javascript, react, framework
---

# NextJS Full Stack App

Server side rendering
Static site generator
Better SEO

## Setup

```bash
mkdir nextjs-full-stack
cd $_
npx create-next-app .
```

`npm run dev` local dev server

While developing the server pre-renders the content and sends it to the browser. On production the pages are rendered at **buld** time (Static Site generation).

## Structure explanation

```bash
$ tree -I node_modules
.
├── README.md
├── package.json
├── pages
│   ├── _app.js
│   ├── api
│   │   └── hello.js
│   └── index.js
├── public
│   └── favicon.ico
├── styles
│   ├── Home.module.css
│   └── globals.css
└── yarn.lock

4 directories, 10 files
```

- `pages` Every page has it's own react component
  - `_app.js` is the root component
  - `api/` when creating apis
  - `index.js` is the only component that comes by defalt
- `public/` for assets, mainly images and css frameworks like bootstrap.
- `styles/` for css modules

## Pages and routing

Ever page has a _Page Component_ and each page component has a file in the `pages/` directory.

The file name determines the route.

The exception is `index.js` wich the `/` route.

Routes work for sub-folders.

If in a sub-folder there is an `index.js` the route will be the name of the folder.

## Drop-in components

Create a folder in the root, pe. `/comps/` and inside any file, like `navbar.js` you can reuse in the pages.

To use the component, pe in the `pages/index.js` you can `import Navbar from ../comps/navbar.js` just like any regular react application.

## Links

You use the `Link` component.
It uses _client side_ navigation. NO need to visit the server.

```javascript
// comps/navbar.js
import Link from 'next/link'
//...
<Link href="/"><a>Home</a></Link>
<Link href="/about"><a>About</a></Link>
<Link href="/contact"><a>Contact</a></Link>
```

The `<a>` inside the `<Link>` without `href` is mandatory.

## Code splitting

Is automatic

Only the js need for the current page is served.

When looking at the netowrk you can see that going to a differnet page serves the `.js` file.

On production also uses pre-fetch.

## Layouts

- Create a new component in the `comps/` folder p.e. `comps/layout.js`
- It should wrap the `MyApp` component that comes by default in `pages/_app.js`

```javascript
// comps/layouts.js
const Layout = ({ children }) => {
  return (
    <div className="container">
      <Navbar />
      {/*import it first */}
      {children}
      <Footer />
    </div>
  )
}
export default Layout
```

```javascript
// pages/_app.js
function MyApp({Component, pageProps}) {
  return (
  <Layout>
    <Component_ {..pageProps} />
  </Layout>
  );
}
export default MyApp;
```

Now you can go into pe `pages/index.js` and remove the Navbar and the footer since `layout.js` already includes it.

## Adding styles

CSS modules are supported by default
in `styles/globals.css` are the default styles

> Does it support `.scss`?

Next will scope css modules (styles added on the component and not global)

The css modoule have a naming convention: Have the `.module.css` sufix

```javascript
// pages/about.js
import styles from '../styles/About.module.css'
...
const About = () => {
  return (
    <div className={styles.container}>
    ...
    </div>
  );
}
export default About;
```

For `<Link>` you style the anchor inside:

```javascript
<Link href="/">
  <a className={styles.link}></a>
</Link>
```

**You need to use _class_ selectors. Pe a style for `<blockquote>` wont work**

## Create a 404 page

Create a `pages/404.js` file

## Redirection

- When a user sends a form for instance.
- We need the `useEffect` hook.
- `useRouter` gives us access to a method that allows you to redirect

```javascript
// pages/404.js 
import { useRouter } from "next/router"

const NotFound = () => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      // router.go(-1) // Go back in history 1 step.
      router.push("/")
    }, 3000)
  }, [])
}
export default NotFound
```

## Static assets

Like images
Place the asset in the `public/` folder

If the image `public/my-image.png` exits, it can be used like:

```javascript
// comps/test-comp.js
const TestComp = () => {
  return (
    <div>
      <img src="/my-image.png" alt="My Image" />
    </div>
  )
}
export default TestComp
```

## Image

The `<Image>` component **forces** us to use the width and height.
It has the advantage that uses _Lazy Load_

```javascript
import Image from "next/image"
//..
<Image src="/my-image.png" width={50} height={50} />
```

## Metadata on the head

Its the `<meta>` html tag on the `<head>` of the pages
The `<Head>` component helps you with that
It comes pre-imported in the `index.js` component
It has to be used per page since the title changes

```javascript
import Head from "next/head"

const About = () => {
  return (
    <>
      <Head>
        <title>My cool blog article</title>
        <meta name="keywords" content="blog, article" />
      </Head>
      <div>{/*...*/}</div>
    </>
  )
}
export default About
```

## Fetching "dynamic" data

The main difference/advantage of NextJS over using pure React code, is that the pages are built on the server releaving the users browser of a lot of work like fetching data from the network. 

But this comes with a price. We have to fetch "dynamic" data at build time and not at run time.

That's why NextJS looks for the function `getStaticProps` on every component, and if it finds it will run it and pass the results to the main component's function.

Let's say that the `pages/cool-users.js` page will show a list of users retreived from the Json API `https://jsonplacehorder.typicode.com/users`. We need to retreive this data at build time and have NextJS create this page in the server. For that we need to create the following component with 2 functions:

```javascript
// pages/cool-useres.js
export const getStaticProps = async () {
  const res = await fetch('https://jsonplacehorder.typicode.com/users');
  const data = await res.json();
  return {
    props: { coolusers: data } // The `props` property is the magic
  }
}

const CoolUsers = ({coolusers}) => {
  return (
    <ul>
      {coolusers.map( item => (
        <li key={item.id}>
          {item.name}
        </li>
      ));}
    </ul>
  )
}
export default CoolUsers;
```

2 important things here to notice:

- This function `getStaticProps` hast to return an object with a `props` property
- Whatever is in the `props` object. It will be passed to the component as the only argument

## Dynamic routes

Following with the previous example, where we retrieve content at build time, we now need a way to create routes for this dynamic content.

In the previous example we created a page, the `pages/cool-users.js` page, with dynamic content: A list of users. But now lets say that for **each item** (each _cool user_ in this case) we want to create a page with his/her contents. A page were we can display her/his complete name, address, phone, etc. For each _cool user_.

For that we need 2 things:

- A way to create pages _dynamically_, since dynamic content has to be fetched a build time.
- A way to create the content for each dynamically created page

The first requirement is achieved by NextJS using a **file naming convention**: If NextJS finds a file where the name contains brackets (`[` and `]`), it will be treated as a file that serves as a template to create pages dynamically.

So for instance, if we create the file `pages/users/[id].js`. Next will understand that the _components_ of that file are for creating dynamic routes. And that that it has to create the pages `page/users/1`, `page/users/2`, `pages/users/123455`, etc... One for each user that the API returns.

For the **second** problem, how to get the **contents** of each route,  NextJS uses the same approach as the previous example: Look for a special function on the component, that returns the content of the dynamically created page.

So in our `pages/users/[id].js` file, we need to create a  `getStaticPaths()` function that takes care of creating new pages, one for each user. And then we need to add a `getStaticProps` function (see previous example) that takes care of getting the information for each new dynamically created page.

Putting it all toghether then, we would need to chreate the `pages/users/[id].js` file with the following contents:


```javascript
// pages/users/[id].js
const apiUrl = 'https://jsonplacehorder.typicode.com/users';

/**
 * This will create the new pages
 */
export const getStaticPaths = async () => {
  const ret = await fetch(apiUrl);
  const json = await ret.json();
  const data = json.map( user => {
    return {
      params: { id: user.id.toString() }
    }
  });
  return { paths: data, fallback: false };
}

/**
 * This will get the contents of each new page.
 * It will get run for each page.
 */
export const getStaticProps = async (context) => {
  const ret = await fetch(apiUrl + '/' + context.params.id );
  const json = await ret.json();
  return {
    props: { user: json }
  }
}

/**
 * This will render the contents of each page
 */
const Details = ({user}) => {
  return (
    <h1>{user.name} {user.last_name}</h1>
  );
}
export default Details;
```

Notice that the `getStaticPaths` returns 
