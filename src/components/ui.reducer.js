export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const TOGGLE_PLAYER = 'TOGGLE_PLAYER';

let initialState = {
    navigationShown: true,
    playerShown: true,
};
export default function (state = initialState, action) {
    if (action.type == TOGGLE_NAVIGATION) {
        return Object.assign({}, state, {navigationShown: !state.navigationShown})
    }

    if (action.type == TOGGLE_PLAYER) {
        return Object.assign({}, state, {playerShown: !state.playerShown})
    }

    return state;
}
