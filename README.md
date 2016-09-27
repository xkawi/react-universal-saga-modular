
# React Universal Saga Modular

an evolution of [react-universal-saga](https://github.com/xkawi/react-universal-saga) with a more modular code structure, inspired by [react-boilerplate](https://github.com/mxstbr/react-boilerplate).

## Getting Started

```
$ git clone https://github.com/xkawi/react-universal-saga-modular.git
$ cd react-universal-saga-modular
$ npm install
$ npm run build-dev
$ npm run dev
$ npm run lint
$ npm test
$ npm run build
$ npm start
```

`build-dev` and `dev` commands are meant for development purpose (e.g. logging, hot module replacement).

`npm run lint` is to perform eslint check across your code base, while `npm test` executes test cases with Jest.

When it is ready for deployment, `build` the production ready folder and `npm start` to run it. You would need something like [PM2](https://github.com/Unitech/pm2) to run your code/React project as daemon/service.

NOTE: PORT is not set for `better-npm-run start-prod` script, because it is necessary configuration for Heroku deployment. If you need to specify the port, feel free to add it.

## Why?

The main objective of react-universal-saga-modular is to provide a more modular, scalable, and manageable codebase as your project grows in complexity and size. This repo can serve as an example, or a starting point for your next Universal React project. If you are not familiar with this structure, or prefer something else (e.g. generator-based, less opinionated, etc) feel free to checkout other alternatives, such as:

* [react-universal-saga](https://github.com/xkawi/react-universal-saga)
* [react-boilerplate](https://github.com/mxstbr/react-boilerplate)
* [react-server](https://github.com/redfin/react-server)
* [retax](https://github.com/retaxJS/retax)
* [react-universally](https://github.com/ctrlplusb/react-universally)
* [create-react-app](https://github.com/facebookincubator/create-react-app)

## Features

* Modular code structure

* Universal/Isomorphic - server side rendering

* [React](https://facebook.github.io/react/) ^15

* [redux](https://github.com/reactjs/redux) & [react-redux](https://github.com/reactjs/react-redux) - state manager

* [redux-saga](https://github.com/yelouafi/redux-saga) - side effects manager

* Async/Await provided by [babel-preset-stage-0](https://babeljs.io/docs/plugins/preset-stage-0/)

* [react-router](https://github.com/ReactTraining/react-router/tree/v2.8.1) - route manager

* [redux-persist](https://github.com/rt2zz/redux-persist) - persist state to browser local storage

* [react-helmet](https://github.com/nfl/react-helmet) - Document head manager

* [Jest](https://github.com/facebook/jest) - Painless JavaScript Testing

* [Webpack](https://webpack.github.io/) - project builder/bundler

* [ESLint](http://eslint.org/) - consistent code style

* Plain CSS, LESS, & SASS - for styling, enabled by style-loader, less-loader and sass-loader respectively

## Modules

A module consist of a set of actions, reducers, sagas, selectors, or any other functions for specific functionality. An example of [github module](https://github.com/xkawi/react-universal-saga-modular/tree/master/src/modules/github) is provided, where all actions, sagas, reducers, and selectors related with github put into a single module folder called 'github'.

Ideally, a module should be modularized enough that it can be used in a plug-and-play manner. Imagine someone writes and share an "authentication" module. If you want to use that module, just place it inside `src/modules` folder (e.g. `src/modules/authentication`), and what's left to do is to import relevant reducers and sagas of that module into `modules/rootReducer.js` and `modules/rootSaga.js`. You will have everything setup for you. Finally, you can just import and use the [viewActions](#view-actions) in your containers or components. This is the biggest benefit of this code structure.

### Adding a module

When adding a module, here are some things to take note:

1. export the necessary reducers functions, actions, or saga watchers of your module

2. import reducers of the new module into `rootReducer.js` to be combined into the global store

3. import saga watchers of the new module into `rootSaga.js` and fork it inside the export default function to run it.

4. import `viewActions` into the view layer when you need it

5. (optional) provides `index.js` into your module to export everything into single object. This helps if you want to import the module as a whole `import github from 'modules/github'`;

6. (optional) if you perform 5.) ensure that there is an `export default` for reducers, actions, sagas, selectors, or other things that you want to export. Otherwise, the import at step 5.) will return undefined, as it does not know the default export of its children (reducers, actions, sagas, selectors, and others).

## Actions

In writing the actions, react-universal-saga-modular suggest to organize it into 2 types: View Actions & Saga Actions. This is not a strict rule, it is just a better way of organising it in my opinion. You can organize it in whatever ways you want to.

### View Actions

View Actions define and contain all actions that are available for any view to use. In short, it helps to provide a more explicit way of saying: "hey <views/containers/components>, you can only use this set of actions".

### Saga Actions

Saga Actions define and contain all actions that are available for sagas to use. Sagas are considered as the "business logic" layer where you handle the flow of side effects. This is often used for making network calls, processing the response/error, store the response/error to the state, or manipulate the state, though the possibilities are endless. As an example, `github` module has `sagaActions` with `user` as one of its key. It has 3 actions, `request`, `success`, and `failure`, and they are only used by the sagas to update the store whether it successfully get the response or failed.

Again, this is just something that I come up with to helps organise the code better. Feel free to organise it in whatever ways you are comfortable with.

## Local Storage Persistance

Redux Persist is used to achieve this. To demonstrate this, follow this steps:

1. Type a github username (e.g. xkawi) and click "Go"

2. scroll all the way down and click "Load More"

3. Visit another username (e.g. someone), and back to the previous username (e.g. xkawi). You will notice at Redux DevTools panel, the @@INIT action contains all previous user entities and repos restored from browser local storage. You can then write your own logic anywhere to use these restored data. The bulk of the logic for this can be found at `src > client.js`.  

## Testing

react-universal-saga-modular comes with [Jest](http://facebook.github.io/jest/) to write test cases for your React components. So whatever Jest can do, you can do it here. 

It can also be used to write test cases for your sagas. An example is provided for `github/sagas` that test one of the saga routine, loadUser, feel free to look at the code. You can refer to redux-saga documentation on how to test your sagas [here](http://yelouafi.github.io/redux-saga/docs/advanced/Testing.html).

## Contributing

Feel free to contribute any feedback, bug reports, or PRs. They are most welcomed. :smile:

would like to buy me coffee? appreciate it. can do it over [here](https://www.paypal.me/KawiXiao/3usd) and you will have my gratitude and sincere thank you. :heart: 

---

Cheers,

@xkawi
