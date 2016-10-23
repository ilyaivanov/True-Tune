import { ALBUMS_SEARCH_DONE, ALBUMS_SEARCH_START, ARTIST_INFO_SEARCH_DONE } from './actions';
let initialState = {};
export default function (state = initialState, action) {
    if (action.type == ALBUMS_SEARCH_START) {
        return Object.assign({}, state, { isLoading: true, albums:[], artist:{tags:[], similar:[]} });
    }

    if (action.type == ALBUMS_SEARCH_DONE) {
        return Object.assign({}, state, { isLoading: false, albums: action.albums });
    }

    if (action.type == ARTIST_INFO_SEARCH_DONE) {
        return Object.assign({}, state, { artist: action.artist });
    }

    return state;
}
