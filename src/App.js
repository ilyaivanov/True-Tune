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

    onArtistSearch(text) {
        return findArtists(text).then(newArtists => this.setState({artists: newArtists}));
    }

    onArtistSelect(artist) {
        return findAlbums(artist.name).then(albums => this.setState({
            albums,
            artistDetails: artist
        }));
    }

    onAlbumSelect(album) {
        return findTracks(this.state.artistDetails.name, album.name).then(tracks => this.setState({
            tracks,
            albumDetails: album
        }));
    }

    render() {
        var page = <SearchPage onArtistSearch={debounce(this.onArtistSearch.bind(this), 500)}
                               onArtistSelect={this.onArtistSelect.bind(this)}
                               artists={this.state.artists}/>;

        if (this.state.albums) {
            page = <AlbumsPage albums={this.state.albums}
                               artist={this.state.artistDetails}
                               onAlbumSelect={this.onAlbumSelect.bind(this)} />
        }

        var player = null;
        if(this.state.albumDetails){
            player = <Player tracks={this.state.tracks} album={this.state.albumDetails} artist={this.state.artistDetails}/>;
        }

        return (
            <main className="page-content">
                <nav className="content-navigation">
                </nav>

                {page}
                <aside className="content-sidebar">
                    {player}
                </aside>
            </main>);
    }
}
export default App;

