import React from 'react';

import './../node_modules/font-awesome/css/font-awesome.css';
import './../templates/sound/style/style.scss';
import Player from './components/Player';

import {findTracks} from './services/lastfm';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tracks: []
        };
    }

    componentWillMount() {
        //no state, no cache access
        this.setAlbumToPlayer(this.props.params);
    }

    componentWillReceiveProps(newProps) {
        //state present, cache access
        this.setAlbumToPlayer(newProps.params);
    }

    setAlbumToPlayer({artistName, albumName}) {
        if (artistName && albumName) {
            findTracks(artistName, albumName).then(tracks => this.setState({tracks}));
        }
    }

    render() {
        let player = null,
            {albumName, artistName} = this.props.params;
        if (this.state.tracks.length > 0) {
            player = <Player tracks={this.state.tracks}
                             album={{name: albumName}}
                             artist={{name: artistName}}/>;
        }

        return (
            <main className="page-content">
                <nav className="content-navigation">
                </nav>

                {this.props.children}
                <aside className="content-sidebar">
                    {player}
                </aside>
            </main>);
    }
}
export default App;

