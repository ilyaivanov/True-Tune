/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './state/store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico

import { syncHistoryWithStore } from 'react-router-redux';
import './../node_modules/font-awesome/css/font-awesome.css';
import './../templates/sound/style/style.scss';
import {loadState, saveState} from './state/store/localStorage';

const store = configureStore(loadState());

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

store.subscribe(() => {
    saveState(store.getState());
});
render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
