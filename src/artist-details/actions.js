import { findAlbums, findInfo, findTracks } from './../services/lastfm';
export const ALBUMS_SEARCH_START = 'ALBUMS_SEARCH_START';
export const ALBUMS_SEARCH_DONE = 'ALBUMS_SEARCH_DONE';
export const ARTIST_INFO_SEARCH_DONE = 'ARTIST_INFO_SEARCH_DONE';
export const ALBUM_SEARCH_START = 'ALBUM_SEARCH_START';
export const ALBUM_INFO_SEARCH_DONE = 'ALBUM_INFO_SEARCH_DONE';

export function startSearchingAlbums() {
    return {
        type: ALBUMS_SEARCH_START
    };
}

export function startSearchingAlbum() {
    return {
        type: ALBUM_SEARCH_START
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


export function fetchAlbumInfoFromServiceAsync(artistName, albumName){
    return dispatch => findTracks(artistName, albumName)
        .then(albumInfo => dispatch({
            albumInfo,
            type: ALBUM_INFO_SEARCH_DONE
        }));

}

