import { findAlbums, findInfo } from './../services/lastfm';
export const ALBUMS_SEARCH_START = 'ALBUMS_SEARCH_START';
export const ALBUMS_SEARCH_DONE = 'ALBUMS_SEARCH_DONE';
export const ARTIST_INFO_SEARCH_DONE = 'ARTIST_INFO_SEARCH_DONE';

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

export function fetchArtistInfoFromServiceAsync(artistName){
    return dispatch => findInfo(artistName)
        .then(artist => dispatch({
            artist,
            type: ARTIST_INFO_SEARCH_DONE
        }));

}

