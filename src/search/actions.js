import { findArtists } from './../services/lastfm';
import {ARTIST_SEARCH_START, ARTIST_SEARCH_DONE} from './../store/reducer';

export function startSearchingArtists() {
    return {
        type: ARTIST_SEARCH_START
    };
}
export function fetchArtistsFromServiceAsync(term) {
    return dispatch => findArtists(term)
        .then(artists => dispatch({
            artists,
            type: ARTIST_SEARCH_DONE
        }));
}

