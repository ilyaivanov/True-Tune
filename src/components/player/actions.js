import findYoutubeVideo from './../../services/youtube';
import {PLAY_TRACK, TRACK_LOADED} from './../../store/reducer';

export function playTrack(artistName, albumName, trackName) {
    return {
        artistName,
        albumName,
        trackName,
        type: PLAY_TRACK
    };
}
export function loadYoutubeTrack(artistName, albumName, trackName) {
    return dispatch => findYoutubeVideo(artistName, trackName)
        .then(video => dispatch({
                video,
                type: TRACK_LOADED
            }));
}
