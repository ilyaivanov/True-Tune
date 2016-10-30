export const ALBUMS_SEARCH_START = 'ALBUMS_SEARCH_START';
export const ALBUMS_SEARCH_DONE = 'ALBUMS_SEARCH_DONE';
export const ARTIST_INFO_SEARCH_DONE = 'ARTIST_INFO_SEARCH_DONE';
export const ALBUM_SEARCH_START = 'ALBUM_SEARCH_START';
export const ALBUM_INFO_SEARCH_DONE = 'ALBUM_INFO_SEARCH_DONE';
export const PLAY_NEXT_TRACK = 'PLAY_NEXT_TRACK';

export const ARTIST_SEARCH_START = 'ARTIST_SEARCH_START';
export const ARTIST_SEARCH_DONE = 'ARTIST_SEARCH_DONE';

export const ADD_ARTIST_TO_FAVORITES = 'ADD_ARTIST_TO_FAVORITES';

export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const TOGGLE_PLAYER = 'TOGGLE_PLAYER';

export const PLAY_TRACK = 'PLAY_TRACK';
export const TRACK_LOADED = 'TRACK_LOADED';
export const ON_PLAY_CHANGE = 'ON_PLAY_CHANGE';


import isEmpty from 'lodash/isEmpty';
import findIndex from 'lodash/findIndex';

let initialState = {
    favorites: [],
    navigationShown: true,
    playerShown: true,
    artists: [],
    video: {},
    isPlaying: true
};
export default function (state = initialState, action) {

    if (action.type == ALBUMS_SEARCH_START) {
        return Object.assign({}, state, { isLoading: true, albums: [], artist: { tags: [], similar: [] } });
    }

    if (action.type == ALBUMS_SEARCH_DONE) {
        return Object.assign({}, state, { isLoading: false, albums: action.albums });
    }

    if (action.type == ARTIST_INFO_SEARCH_DONE) {
        return Object.assign({}, state, { artist: action.artist });
    }


    if (action.type == ALBUM_SEARCH_START) {
        return { ...state };
    }
    if (action.type == ALBUM_INFO_SEARCH_DONE) {
        return { ...state, selectedAlbum: action.albumInfo, currentTrackIndex: -1 };
    }
    if (action.type == PLAY_NEXT_TRACK) {
        if (state.currentTrackIndex < state.selectedAlbum.tracks.length - 1)
            return { ...state, currentTrackIndex: state.currentTrackIndex + 1 };
        else
            return state;
    }

    if (action.type == ARTIST_SEARCH_START) {
        return Object.assign({}, state, { isLoading: true });
    }

    if (action.type == ARTIST_SEARCH_DONE) {
        return Object.assign({}, state, { isLoading: false, artists: action.artists });
    }


    if (action.type == ARTIST_SEARCH_START) {
        return Object.assign({}, state, { isLoading: true });
    }

    if (action.type == ARTIST_SEARCH_DONE) {
        return Object.assign({}, state, { isLoading: false, artists: action.artists });
    }


    if (action.type == ADD_ARTIST_TO_FAVORITES) {
        let existingFavorites = state.favorites.filter(item => item.id == action.artist.id);
        if (isEmpty(existingFavorites)) {
            let favorites = [...state.favorites, action.artist];
            return { ...state, favorites };
        }
    }

    if (action.type == TOGGLE_NAVIGATION) {
        return Object.assign({}, state, { navigationShown: !state.navigationShown });
    }

    if (action.type == TOGGLE_PLAYER) {
        return Object.assign({}, state, { playerShown: !state.playerShown });
    }

    if (action.type == PLAY_TRACK) {
        let trackIndex = findIndex(state.selectedAlbum.tracks, t => t.name == action.trackName);
        return {
            ...state,
            artistName: action.artistName,
            albumName: action.albumName,
            trackName: action.trackName,
            trackIndex
        };
    }

    if (action.type == TRACK_LOADED) {
        return { ...state, video: action.video };
    }

    if (action.type == ON_PLAY_CHANGE) {
        return { ...state, isPlaying: action.isPlaying };
    }

    return state;
}
