import React from 'react';
import { render } from 'react-dom';
import App from './components/App'
import { Provider } from 'react-redux';
import { loadState, saveState } from './utils/localStorage';
import throttle from 'lodash/throttle';
import createStore from './store/create';

let store = createStore(loadState());

store.subscribe(throttle(function () {
    let substateToSave = { favorites: store.getState().favorites };
    saveState(substateToSave);
}, 1000));

render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('app'));


