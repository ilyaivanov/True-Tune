import React from 'react';

import './../node_modules/font-awesome/css/font-awesome.css';
import './../templates/sound/style/style.scss';
import debounce from 'lodash/debounce';
import Player from './components/Player';
import SearchPage from './components/SearchPage';
import AlbumsPage from './components/AlbumsPage';

import {findArtists, findAlbums, findTracks} from './services/lastfm';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            artistDetails: null,
            albums: null,
            albumDetails: null
        };
    }

    componentWillMount() {
        //no state, no cache access
        let {albumName, artistName} = this.props.params;
        this.setAlbumToPlayer(artistName, albumName);
    }

    componentWillReceiveProps() {
        //state present, cache access
        let {albumName, artistName} = this.props.params;
        this.setAlbumToPlayer(artistName, albumName);
    }

    setAlbumToPlayer(artistName, albumName) {
        return findTracks(artistName, albumName).then(tracks => this.setState({
            tracks,
            albumDetails: {name: albumName}
        }));
    }

    render() {
        var player = null;
        if (this.state.albumDetails) {
            player = <Player tracks={this.state.tracks} album={this.state.albumDetails}
                             artist={{name: this.props.params.artistName}}/>;
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

