import { ARTIST_SEARCH_START, ARTIST_SEARCH_DONE } from './actions';
let initialState = {
    artists: []
};
export default function (state = initialState, action) {
    if (action.type == ARTIST_SEARCH_START) {
        return Object.assign({}, state, { isLoading: true });
    }

    if (action.type == ARTIST_SEARCH_DONE) {
        return Object.assign({}, state, { isLoading: false, artists: action.artists });
    }

    return state;
}
