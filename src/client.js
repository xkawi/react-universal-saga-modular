import React from 'react';
import { render } from 'react-dom';
import GoogleAnalytics from 'react-ga';
import merge from 'lodash/merge';
import { getStoredState, createPersistor } from 'redux-persist';

import Root from './containers/Root/Root';
import rootSaga from './modules/rootSaga';
import getRoutes from './routes';
import { history } from './services';
import configureStore from './store/configureStore';
import config from './config';

GoogleAnalytics.initialize(config.app.googleAnalytics.appId);

async function renderClient() {
  const persistConfig = {
    whitelist: ['entities', 'pagination']
  };

  // window.__data = initial state passed down by server to client
  let initialState = window.__data; // eslint-disable-line
  try {
    const restoredState = await getStoredState(persistConfig);
    initialState = merge({}, initialState, restoredState);
  } catch (error) {
    console.log('error restoring state:', error);
  }

  const dest = document.getElementById('content');
  const store = configureStore(history, initialState);
  const persistor = createPersistor(store, persistConfig); // eslint-disable-line

  store.runSaga(rootSaga);

  render(
    <Root store={store} history={history} routes={getRoutes(store)} />,
    dest
  );

  if (process.env.NODE_ENV !== 'production') {
    window.React = React; // enable debugger
  }
}

renderClient();
