import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {routerReducer} from 'react-router-redux';
import thunk from 'redux-thunk';
import search from './../search/reducer';
import favorites from './../favotires/reducer';
import artistDetails from './../artist-details/reducer';
import ui from './../components/ui.reducer';
import player from './../player/reducer';
const rootReducer = combineReducers({
    favorites,
    search,
    artistDetails,
    player,
    ui,
    routing: routerReducer
});

export default function (initialState = undefined) {
    let chromeExtension = window.devToolsExtension ? window.devToolsExtension() : f => f; // add support for Redux dev tools
    return createStore(rootReducer, initialState, compose(applyMiddleware(thunk), chromeExtension));
}
