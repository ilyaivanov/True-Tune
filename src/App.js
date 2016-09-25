import React from 'react';

import './../node_modules/font-awesome/css/font-awesome.css';
import './../templates/sound/style/style.scss';

import Player from './components/Player';
import SearchPage from './components/SearchPage';


import {findArtists} from './services/lastfm';

// import SearchPageContent from './components/SearchPageContent';

class App extends React.Component {
    render() {
        var Page = SearchPage;

        let onArtistSearch = text => findArtists(text).then(ar => console.log(ar));//call setSTate from promise resolution
        let artists = [
            {id: 1, name: "Asura"},
            {id: 2, name: "Carbon Based Lifeforms"},
            {id: 3, name: "Sync24"}
        ];
        return (
            <main className="page-content">
                <nav className="content-navigation">
                </nav>

                <Page onArtistSearch={onArtistSearch} artists={artists}/>

                <Player/>
            </main>);
    }
}
export default App;

