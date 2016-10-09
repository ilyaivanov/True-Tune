import React from 'react';
import $ from 'jquery';
import 'jstree';
import './../../../node_modules/jstree-bootstrap-theme/dist/themes/proton/style.css';

export default class Playlist extends React.Component {

    componentDidMount() {
        init($(this._tree));
    }

    render() {
        return (<div ref={(c) => this._tree = c}></div>);
    }

}

function init(root) {
    root.jstree({
        core: {
            check_callback: true,
            themes: {
                name: 'proton',
                responsive: true
            },

            data: [

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
        },
        plugins: [
            "dnd"
        ]
    });
}

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
