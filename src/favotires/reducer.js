import { ADD_ARTIST_TO_FAVORITES } from './actions';
import isEmpty from 'lodash/isEmpty';
let initialState = [];
export default function (state = initialState, action) {
    if (action.type == ADD_ARTIST_TO_FAVORITES) {
        let existingFavorites = state.filter(item => item.id == action.artist.id);
        if (isEmpty(existingFavorites))
            return [...state, action.artist];
    }

    return state;
}
