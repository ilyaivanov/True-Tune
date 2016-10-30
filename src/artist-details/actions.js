import { findAlbums, findInfo, findTracks } from './../services/lastfm';
import * as actions from './../store/reducer';

export function startSearchingAlbums() {
    return {
        type: actions.ALBUMS_SEARCH_START
    };
}

export function startSearchingAlbum() {
    return {
        type: actions.ALBUM_SEARCH_START
    };
}

export function fetchAlbumsFromServiceAsync(artistName) {
    return dispatch => findAlbums(artistName)
        .then(albums => dispatch({
            albums,
            type: actions.ALBUMS_SEARCH_DONE
        }));
}

export function fetchArtistInfoFromServiceAsync(artistName){
    return dispatch => findInfo(artistName)
        .then(artist => dispatch({
            artist,
            type: actions.ARTIST_INFO_SEARCH_DONE
        }));

}


export function fetchAlbumInfoFromServiceAsync(artistName, albumName){
    return dispatch => findTracks(artistName, albumName)
        .then(albumInfo => dispatch({
            albumInfo,
            type: actions.ALBUM_INFO_SEARCH_DONE
        }));

}

