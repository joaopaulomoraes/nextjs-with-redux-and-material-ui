# NextJS with Redux and Material-UI example

A boilerplate NextJS with Redux and Material UI

## Getting Started

### Installing

Cloning the project.
```
git clone https://github.com/joaopaulomoraes/nextjs-with-redux-and-material-ui.git nextjs-with-redux-and-material-ui
```

Access the project directory.
```
cd nextjs-with-redux-and-material-ui
```

Install dependencies.
```
yarn install
```

Serve with hot reload at http://localhost:3000.
```
yarn dev
```

## The idea behind the example

In this example, we will display a counter that is initialized with a value of 0 and will be updated with each click. The first rendering is happening on the server, then the browser takes over. To illustrate this, the rendered counter will have a value of 1 when the app loads and a flag with the dispatch source will be displayed above the counter. From the next clicks that increment / decrement, the counter will receive its new value and the flag with the origin will be updated again with the origin of the dispatch.

![](https://i.imgur.com/6YQqLiL.gif)

Our page is located in `pages/index.js`, so it will map the `/` route. To get the initial data for rendering, we are implementing the `getInitialProps` static method, initializing the redux storage and dispatching the increment action, passing the isServer parameter to identify that the dispatch source is coming from the server. As the component is packaged with `next-redux-wrapper`, the component is automatically connected to Redux and packaged with the reagent-redux Provider`, which allows us to access the redux state immediately and send the storage to the child components for that they access the state when necessary.

For security, it is recommended to wrap all pages, whether they use Redux or not, so you do not worry about all the child components anymore.

The `withRedux` function accepts` makeStore` as the first argument, all other arguments are passed internally to the `react-redux connect ()` function. The `makeStore` function will receive the initialState as an argument and should return a new instance of redux store every time it is called, no memoisation is required here. See the [full example] (https://github.com/kirill-konshin/next-redux-wrapper#usage) in the Next Redux Wrapper repository. And there's another package [https://github.com/huzidaha/next-connect-redux] available with similar features.

To pass the initial state from the server to the client, we pass as a prop called `initialState`, so it is available when the client takes control.

The trick here to support the universal redux is to separate the cases for the client and the server. When we are on the server, we want to create a new store every time, otherwise the data from the different users will be mixed. If we are on the customer, we always want to use the same store. This is what we do in `store.js`

Again, the first render is happening in the server and instead of starting the count at 0, it will dispatch an action in redux that starts the count at 1. This continues to highlight how each navigation triggers a server render first and then a client render second, when you navigate between pages.

---

## License

[![CC0](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/cc-zero.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
