import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Search from './search/Search';
import { Provider } from 'react-redux';
import { loadState, saveState } from './utils/localStorage';
import throttle from 'lodash/throttle';
import createStore from './store/create';
import ArtistDetails from './artist-details/ArtistDetails';

import { syncHistoryWithStore } from 'react-router-redux';

let store = createStore(loadState());

store.subscribe(throttle(function () {
    let substateToSave = { favorites: store.getState().favorites };
    saveState(substateToSave);
}, 1000));

let routes = (<Route path="/" component={App}>
    <IndexRoute component={Search}/>
    <Route path="/artist/:artistName" component={ArtistDetails}/>
</Route>);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history} routes={routes}/>
    </Provider>, document.getElementById('app'));


