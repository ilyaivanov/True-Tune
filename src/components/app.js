import React from 'react';
import 'react-select2-wrapper/css/select2.css';
import lastfm from './../loaders/lastfm';
import Sidebar from './sidebar/sidebar';
import {FormControl} from 'react-bootstrap';
import SearchResults from './searchResults';
import './../../node_modules/bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {artists: []};
    }

    render() {
        function onChange(event) {
            //TODO: add a delay
            lastfm
                .findArtists(event.target.value)
                .then(artists => this.setState({artists: artists}));
        }

        function toggleArtist(artist) {
            artist.areAlbumsShown = !artist.areAlbumsShown;
            this.forceUpdate();
        }

        function toggleAlbum(album) {
            album.areTracksShown = !album.areTracksShown;
            this.forceUpdate();
        }

        return (<div id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <FormControl
                                type="text"
                                placeholder="Start entering an artist name"
                                onChange={onChange.bind(this)}
                            />
                            <br/>
                            <SearchResults toggleArtist={toggleArtist.bind(this)}
                                           toggleAlbum={toggleAlbum.bind(this)}
                                           artists={this.state.artists}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default App;