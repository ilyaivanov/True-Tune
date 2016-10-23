import {ALBUM_SEARCH_START, ALBUM_INFO_SEARCH_DONE} from './../artist-details/actions';
let initialState = {
    isLoading: false
};
export default function (state = initialState, action) {
    if (action.type == ALBUM_SEARCH_START) {
        return {...state, isLoading: true};
    }
    if (action.type == ALBUM_INFO_SEARCH_DONE) {
        return {...state, isLoading: false, selectedAlbum: action.albumInfo};
    }

    return state;
}
