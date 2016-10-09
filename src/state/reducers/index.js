import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import objectAssign from 'object-assign';
import * as constants from './constants';

export let initialState = {
    app: {
        artists: [],
        albums: []
    },
    playlist: {
        items: [
            playlist('Ambient', [
                artist('Asura', albums1()),
                artist('Asura', albums1())
            ]),
            playlist('Psycho', [
                artist('Asura', albums1()),
                artist('Asura', albums1())
            ]),
            playlist('Dark Ambient', [
                artist('Asura', albums1()),
                artist('Asura', albums1())
            ]),
        ]
    }
};

function fuelSavingsReducer(state = initialState.app, action) {
    switch (action.type) {
        case constants.SEARCH_ARTISTS_DONE:
            return objectAssign({}, state, {artists: action.artists});

        case constants.SELECT_ALBUM:
            return objectAssign({}, state, {albumInfo: action.albumInfo});

        case constants.SELECT_ARTIST:
            return objectAssign({}, state, {currentArtist: action.artist});

        case constants.SEARCH_ALBUMS_DONE:
            return objectAssign({}, state, {albums: action.albums});
        default:
            return state;
    }
}

function playlistReducer(state = initialState.playlist, action) {
    switch (action.type) {
        case constants.CREATE_PLAYLIST:
            return objectAssign({}, {items: state.items.concat(playlist('New'))});
    }

    return state;
}

const rootReducer = combineReducers({
    app: fuelSavingsReducer,
    playlist: playlistReducer,
    routing: routerReducer
});

export default rootReducer;


function albums1() {
    return [
        album('Hydroponic Garden', [
            track('Track 1'),
            track('Track 2'),
            track('Track 3'),
            track('Track 4'),
            track('Track 5'),
            track('Track 6'),
            track('Track 7'),
        ]),
        album('World Of Sleepers', [
            track('Track 1'),
            track('Track 2'),
            track('Track 3'),
            track('Track 4'),
            track('Track 5'),
            track('Track 6'),
            track('Track 7'),
        ]),
        album('Interloper'),
        album('The Path')
    ];
}
//icon: 'https://dl.dropboxusercontent.com/u/74942979/1476025048_cd.png'
function playlist(name, children) {
    return entity(name, children, 'https://dl.dropboxusercontent.com/u/74942979/1476025295_playlist.png');
}


function artist(name, children) {
    return entity(name, children, 'http://www.iconsdownload.net/icons/24/10341-artist-music-player-representation.png');
}

function album(name, children) {
    return {
        text: name,
        children: children,
        icon: 'https://dl.dropboxusercontent.com/u/74942979/1476025048_cd.png'
    };
}

function track(name, children) {
    return entity(name, children, 'https://dl.dropboxusercontent.com/u/74942979/1476027939_play-circle-outline.png');
}


function entity(name, children, icon) {
    return {
        text: name,
        children: children,
        icon: icon
    };
}
