import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {routerReducer} from 'react-router-redux';
import thunk from 'redux-thunk';
import app from './reducer';

const rootReducer = combineReducers({
    app,
    routing: routerReducer
});

export default function (initialState = undefined) {
    let chromeExtension = window.devToolsExtension ? window.devToolsExtension() : f => f; // add support for Redux dev tools
    return createStore(rootReducer, initialState, compose(applyMiddleware(thunk), chromeExtension));
}


//artist
    //albums
        //tracks
//search results
//playlists
//selectedArtist
//selectedAlbum(s)
//playing track
