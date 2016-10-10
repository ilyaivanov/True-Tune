import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import objectAssign from 'object-assign';
import * as constants from './constants';

export let initialState = {
    app: {
        artists: [],
        albums: []
    },
    playlist: {
        items: [
            playlist('Favorites')
        ]
    }
};

function fuelSavingsReducer(state = initialState.app, action) {
    switch (action.type) {
        case constants.SEARCH_ARTISTS_DONE:
            return objectAssign({}, state, {artists: action.artists});

        case constants.SELECT_ALBUM:
            return objectAssign({}, state, {albumInfo: action.albumInfo});

        case constants.SELECT_ARTIST:
            return objectAssign({}, state, {currentArtist: action.artist});

        case constants.SEARCH_ALBUMS_DONE:
            return objectAssign({}, state, {albums: action.albums});
        default:
            return state;
    }
}

function playlistReducer(state = initialState.playlist, action) {
    switch (action.type) {
        case constants.ADD_TO_FAVORITES: {
            return objectAssign({}, {items: state.items.concat(artist(action.item.name))});
        }
    }

    return state;
}

const rootReducer = combineReducers({
    app: fuelSavingsReducer,
    playlist: playlistReducer,
    routing: routerReducer
});

export default rootReducer;


function playlist(name, children) {
    return entity(name, children, 'https://dl.dropboxusercontent.com/u/74942979/1476025295_playlist.png');
}

function artist(name, children) {
    return entity(name, children, 'http://www.iconsdownload.net/icons/24/10341-artist-music-player-representation.png');
}

function album(name, children) {
    return entity(name, children, 'https://dl.dropboxusercontent.com/u/74942979/1476025048_cd.png');
}

function track(name, children) {
    return entity(name, children, 'https://dl.dropboxusercontent.com/u/74942979/1476027939_play-circle-outline.png');
}


function entity(name, children, icon) {
    return {
        text: name,
        children: children,
        icon: icon
    };
}
