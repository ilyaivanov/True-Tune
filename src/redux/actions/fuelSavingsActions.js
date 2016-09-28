import * as types from '../constants/actionTypes';
import {findArtists, findAlbums} from './../../services/lastfm';

export function searchForArtists(text) {
    return dispatch =>
        findArtists(text)
            .then(artists => dispatch({
                type: types.SEARCH_ARTISTS_DONE,
                artists
            }));
}

export function searchForAlbums(artist) {
    return dispatch =>
        findAlbums(artist)
            .then(albums => dispatch({
                type: types.SEARCH_ALBUMS_DONE,
                albums
            }));
}