import { findArtists } from './../services/lastfm';
export const ARTIST_SEARCH_START = 'ARTIST_SEARCH_START';
export const ARTIST_SEARCH_DONE = 'ARTIST_SEARCH_DONE';

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

