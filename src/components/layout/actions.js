import { TOGGLE_PLAYER, TOGGLE_NAVIGATION } from '../../store/reducer';

export function togglePlayer() {
    return {
        type: TOGGLE_PLAYER
    };
}
export function toggleNavigation() {
    return {
        type: TOGGLE_NAVIGATION
    };
}

