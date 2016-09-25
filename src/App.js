import React from 'react';

import './../node_modules/font-awesome/css/font-awesome.css';
import './../templates/sound/style/style.scss';
import debounce from 'lodash/debounce';
import Player from './components/Player';
import SearchPage from './components/SearchPage';


import {findArtists} from './services/lastfm';

// import SearchPageContent from './components/SearchPageContent';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: []
        }
    }

    render() {
        var Page = SearchPage;

        let onArtistSearch = text => findArtists(text)
                                    .then(newArtists => this.setState({artists: newArtists}));
        return (
            <main className="page-content">
                <nav className="content-navigation">
                </nav>

                <Page onArtistSearch={debounce(onArtistSearch, 500)} artists={this.state.artists}/>

                <Player/>
            </main>);
    }
}
export default App;

