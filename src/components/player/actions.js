import findYoutubeVideo from './../../services/youtube';
import { PLAY_TRACK, PLAY_NEXT_TRACK, PLAY_PREVIOUS_TRACK, TRACK_LOADED, ON_PLAY_CHANGE } from './../../store/reducer';

export const playTrack = (artistName, albumName, trackName) => ({
    artistName,
    albumName,
    trackName,
    type: PLAY_TRACK
})


export function loadYoutubeTrack(artistName, albumName, trackName) {
    return dispatch => findYoutubeVideo(artistName, trackName)
        .then(video => dispatch({
            video,
            type: TRACK_LOADED
        }));
}

export const playNextTrack = () => ({
    type: PLAY_NEXT_TRACK
});
export const playPreviousTrack = () => ({
    type: PLAY_PREVIOUS_TRACK
});

export const togglePlay = (isPlaying) => ({
    isPlaying,
    type: ON_PLAY_CHANGE
});
