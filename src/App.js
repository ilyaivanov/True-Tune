import React from 'react';

import './../node_modules/font-awesome/css/font-awesome.css';
import './../templates/sound/style/style.scss';
import debounce from 'lodash/debounce';
import Player from './components/Player';
import SearchPage from './components/SearchPage';
import AlbumsPage from './components/AlbumsPage';

import {findArtists, findAlbums} from './services/lastfm';

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

    onArtistSearch(text) {
        return findArtists(text).then(newArtists => this.setState({artists: newArtists}));
    }

    onArtistSelect(artist) {
        return findAlbums(artist.name).then(albums => this.setState({
            albums,
            artistDetails: artist
        }));
    }

    render() {
        var Page = <SearchPage onArtistSearch={debounce(this.onArtistSearch.bind(this), 500)}
                               onArtistSelect={this.onArtistSelect.bind(this)}
                               artists={this.state.artists}/>;

        if (this.state.albums) {
            Page = <AlbumsPage albums={this.state.albums} artist={this.state.artistDetails}/>
        }

        var tracks = [
            {name: 'Dreamimg', duration: 1091, id: 1},
            {name: 'Inspire', duration: 1331, id: 2},
            {name: 'Whoka', duration: 1291, id: 3},
            {name: 'Go go', duration: 1391, id: 4},
        ];

        return (
            <main className="page-content">
                <nav className="content-navigation">
                </nav>

                {Page}
                <aside className="content-sidebar">
                    <Player tracks={tracks} album={this.state.albumDetails}/>
                </aside>
            </main>);
    }
}
export default App;

