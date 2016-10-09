import {findArtists, findAlbums, findInfo, findTracks} from '../../services/lastfm';
import * as constants from './constants';

export function searchForArtists(text) {
    return dispatch =>
        findArtists(text)
            .then(artists => dispatch({
                type: constants.SEARCH_ARTISTS_DONE,
                artists
            }));
}

export function searchForAlbums(artist) {
    return dispatch =>
        findAlbums(artist)
            .then(albums => dispatch({
                type: constants.SEARCH_ALBUMS_DONE,
                albums
            }));
}

export function searchForArtistInfo(artistName) {
    return dispatch =>
        findInfo(artistName)
            .then(artist => dispatch({
                type: constants.SELECT_ARTIST,
                artist
            }));
}

export function selectAlbum(artistName, albumName) {
    return dispatch =>
        findTracks(artistName, albumName)
            .then(albumInfo => dispatch({
                type: constants.SELECT_ALBUM,
                albumInfo
            }));
}

export function selectArtist(artist) {
    return {
        artist,
        type: constants.SELECT_ARTIST
    };
}

export function createPlaylist(){
    return {
        type: constants.CREATE_PLAYLIST
    };
}
