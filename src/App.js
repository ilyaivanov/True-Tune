import React from 'react';

import './../node_modules/font-awesome/css/font-awesome.css';
import './../templates/sound/style/style.scss';
import debounce from 'lodash/debounce';
import Player from './components/Player';
import SearchPage from './components/SearchPage';
import AlbumsPage from './components/AlbumsPage';


import {findArtists, findAlbums} from './services/lastfm';

// import SearchPageContent from './components/SearchPageContent';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            artistDetails: null,
            albums: null
        };
        this.onArtistSearch = this.onArtistSearch.bind(this);
        this.onArtistSelect = this.onArtistSelect.bind(this);
    }

    onArtistSearch(text){
        return findArtists(text).then(newArtists => this.setState({artists: newArtists}));
    }

    onArtistSelect(artist){
        return findAlbums(artist.name).then(albums => this.setState({
            albums,
            artistDetails : artist
        }));
    }

    render() {
        var Page = <SearchPage onArtistSearch={debounce(this.onArtistSearch, 500)}
                         onArtistSelect={this.onArtistSelect}
                         artists={this.state.artists}/>;
        debugger;
        if(this.state.albums){
            Page = <AlbumsPage albums={this.state.albums} artist={this.state.artistDetails} />
        }


        return (
            <main className="page-content">
                <nav className="content-navigation">
                </nav>

                {Page}

                <Player/>
            </main>);
    }
}
export default App;

