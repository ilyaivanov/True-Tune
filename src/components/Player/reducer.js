import findYoutubeVideo from './../../services/youtube';
const PLAY_TRACK = 'PLAY_TRACK';
const TRACK_LOADED = 'TRACK_LOADED';
const TRACK_LOADING_ERROR = 'TRACK_LOADING_ERROR';
export const ON_PLAY_CHANGE = 'ON_PLAY_CHANGE';

export function playTrack(artistName, albumName, trackName) {
    return {
        artistName,
        albumName,
        trackName,
        type: PLAY_TRACK
    }
}
export function loadYoutubeTrack(artistName, albumName, trackName) {
    return dispatch => findYoutubeVideo(artistName, trackName)
        .then(video => dispatch({
                video,
                type: TRACK_LOADED
            }),
            error => dispatch => dispatch({
                type: TRACK_LOADING_ERROR
            }));
}

let initialState = {
    video:{},
    isPlaying: true
};

export default function (state = initialState, action) {
    if (action.type == PLAY_TRACK) {
        return { ...state, artistName: action.artistName, albumName: action.albumName, trackName: action.trackName };
    }

    if (action.type == TRACK_LOADED) {
        return { ...state, video: action.video };
    }

    if(action.type == ON_PLAY_CHANGE){
        return {...state, isPlaying: action.isPlaying};
    }

    return state;
}