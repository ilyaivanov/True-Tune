import * as types from '../constants/actionTypes';
import {findArtists} from './../services/lastfm';

export function searchForArtists(text) {
    return dispatch =>
        findArtists(text)
            .then(artists => dispatch({
                type: types.SEARCH_ARTISTS_DONE,
                artists
            }));
}