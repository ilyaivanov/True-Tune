import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import objectAssign from 'object-assign';
import {findArtists, findAlbums, findInfo, findTracks} from './../../services/lastfm';

export const SEARCH_ARTISTS_DONE = 'SEARCH_ARTISTS_DONE';
export const SEARCH_ALBUMS_DONE = 'SEARCH_ALBUMS_DONE';
export const SELECT_ARTIST = 'SELECT_ARTIST';
export const SELECT_ALBUM = 'SELECT_ALBUM';

export function searchForArtists(text) {
    return dispatch =>
        findArtists(text)
            .then(artists => dispatch({
                type: SEARCH_ARTISTS_DONE,
                artists
            }));
}

export function searchForAlbums(artist) {
    return dispatch =>
        findAlbums(artist)
            .then(albums => dispatch({
                type: SEARCH_ALBUMS_DONE,
                albums
            }));
}

export function searchForArtistInfo(artistName) {
    return dispatch =>
        findInfo(artistName)
            .then(artist => dispatch({
                type: SELECT_ARTIST,
                artist
            }));
}

export function selectAlbum(artistName, albumName) {
    return dispatch =>
        findTracks(artistName, albumName)
            .then(albumInfo => dispatch({
                type: SELECT_ALBUM,
                albumInfo
            }));
}

export function selectArtist(artist) {
    return {
        artist,
        type: SELECT_ARTIST
    };
}

export let initialState = {
    app: {
        artists: [],
        albums: []
    }
};

function fuelSavingsReducer(state = initialState.app, action) {
    switch (action.type) {
        case SEARCH_ARTISTS_DONE:
            return objectAssign({}, state, {artists: action.artists});

        case SELECT_ALBUM:
            return objectAssign({}, state, {albumInfo: action.albumInfo});

        case SELECT_ARTIST:
            return objectAssign({}, state, {currentArtist: action.artist});

        case SEARCH_ALBUMS_DONE:
            return objectAssign({}, state, {albums: action.albums});
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    app: fuelSavingsReducer,
    routing: routerReducer
});

export default rootReducer;
