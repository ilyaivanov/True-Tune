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

export const playNextTrack = () => (dispatch, getState) => {

    dispatch({
        type: PLAY_NEXT_TRACK
    });
    let index = getState().app.trackIndex;
    dispatch(loadYoutubeTrack(
        getState().app.artist.name,
        getState().app.selectedAlbum.name,
        getState().app.selectedAlbum.tracks[index].name));
}

export const playPreviousTrack = () => ({
    type: PLAY_PREVIOUS_TRACK
});

export const togglePlay = (isPlaying) => ({
    isPlaying,
    type: ON_PLAY_CHANGE
});
