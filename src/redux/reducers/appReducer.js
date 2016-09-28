import * as actions from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function fuelSavingsReducer(state = initialState.app, action) {
    switch (action.type) {
        case actions.SEARCH_ARTISTS_DONE:
            return objectAssign({}, state, {artists: action.artists});

        case actions.SEARCH_ALBUMS_DONE:
            return objectAssign({}, state, {albums: action.albums});
        default:
            return state;
    }
}
