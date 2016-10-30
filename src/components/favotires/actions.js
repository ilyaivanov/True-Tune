import { ADD_ARTIST_TO_FAVORITES } from '../../store/reducer';

export function add(artist) {
    return {
        artist,
        type: ADD_ARTIST_TO_FAVORITES
    };
}

