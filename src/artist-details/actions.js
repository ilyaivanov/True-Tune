import { findAlbums } from './../services/lastfm';
export const ALBUMS_SEARCH_START = 'ALBUMS_SEARCH_START';
export const ALBUMS_SEARCH_DONE = 'ALBUMS_SEARCH_DONE';

export function startSearchingAlbums() {
    return {
        type: ALBUMS_SEARCH_START
    };
}
export function fetchAlbumsFromServiceAsync(artistName) {
    return dispatch => findAlbums(artistName)
        .then(albums => dispatch({
            albums,
            type: ALBUMS_SEARCH_DONE
        }));
}

