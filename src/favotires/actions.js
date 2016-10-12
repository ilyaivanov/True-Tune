export const ADD_ARTIST_TO_FAVORITES = 'ADD_ARTIST_TO_FAVORITES';

export function add(artist) {
    return {
        artist,
        type: ADD_ARTIST_TO_FAVORITES
    };
}

