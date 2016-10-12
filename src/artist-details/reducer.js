import { ALBUMS_SEARCH_DONE, ALBUMS_SEARCH_START } from './actions';
let initialState = {};
export default function (state = initialState, action) {
    if (action.type == ALBUMS_SEARCH_START) {
        return Object.assign({}, state, { isLoading: true });
    }

    if (action.type == ALBUMS_SEARCH_DONE) {
        return Object.assign({}, state, { isLoading: false, albums: action.albums });
    }

    return state;
}
