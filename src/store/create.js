import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import search from './../search/reducer';
import favorites from './../favotires/reducer';
import artistDetails from './../artist-details/reducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
    favorites,
    search,
    artistDetails,
    routing: routerReducer
});

export default function (initialState = undefined) {
    let chromeExtension = window.devToolsExtension ? window.devToolsExtension() : f => f; // add support for Redux dev tools
    return createStore(rootReducer, initialState, compose(applyMiddleware(thunk), chromeExtension));
}
