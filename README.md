
# React Universal Saga Modular

an evolution of [react-universal-saga](https://github.com/xkawi/react-universal-saga) with a more modular code structure, inspired by [react-boilerplate](https://github.com/mxstbr/react-boilerplate).

**Some of you might wonder, why another repo instead of making the changes into react-universal-saga directly?**

My answer would be: to show people that there are other (perhaps better) ways of managing/organising your code. I do not want to claim that this approach is better than others. I do want to contribute back to the society things that works for me and that I find others would benefit from it.

My experience of putting things together for react-universal-saga has given me a new insights of a "better approach" in organising/structuring the codebase. Hence, this repo is born. So now, you can go take a look at both approaches, react-universal-saga and react-universal-saga-modular, and pick things that are relevant or useful for you. :smile: _though if you ask my preference, I would choose react-universal-saga-modular over react-universal-saga._

## Features

* Modular code structure

* Universal/Isomorphic - server side rendering

* [React](https://facebook.github.io/react/) ^15

* [redux](https://github.com/reactjs/redux) & [react-redux](https://github.com/reactjs/react-redux) - state manager

* [redux-saga](https://github.com/yelouafi/redux-saga) - side effects manager

* Async/Await provided by [babel-preset-stage-0](https://babeljs.io/docs/plugins/preset-stage-0/)

* [react-router](https://github.com/ReactTraining/react-router/tree/v2.8.1) - route manager

* [redux-persist](https://github.com/rt2zz/redux-persist) - persist state to browser local storage

* [redux-form](https://github.com/erikras/redux-form) - form state manager 

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

1. Type a github username and click "Go"

2. scroll all the way down and click "Load More"

3. Refresh the page. You will notice that, the @@INIT state will have more than 50 (per page is 30) users and repos entities. If you observe the Network tab within Chrome Dev Tools (right click anywhere within the website > Inspect), there is not extra network calls made. This demonstrate Redux Persist in action. The bulk of the logic can be found at `src > client.js`.  

## Testing

react-universal-saga-modular comes with [Jest](http://facebook.github.io/jest/) to write test cases for your React components. So whatever Jest can do, you can do it here. 

It can also be used to write test cases for your sagas. An example is provided for `github/sagas` that test one of the saga routine, loadUser, feel free to look at the code. You can refer to redux-saga documentation on how to test your sagas [here](http://yelouafi.github.io/redux-saga/docs/advanced/Testing.html).

## Contributing

Feel free to contribute any feedback, bug reports, or PRs. They are most welcomed. :smile:

would like to buy me coffee? appreciate it. can do it over [here](https://www.paypal.me/KawiXiao/3usd) and you will have my gratitude and sincere thank you. :heart: 

---

Cheers,

@xkawi
