import React from 'react';
import 'react-select2-wrapper/css/select2.css';
import lastfm from './../loaders/lastfm';
import Sidebar from './sidebar/sidebar';
import {FormControl} from 'react-bootstrap';
import SearchResults from './searchResults';
import './../../node_modules/bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {artists: []};
        this.delayedOnChange = _.debounce(this.delayedOnChange, 300);
    }

    onChange(event){
        //http://stackoverflow.com/a/28046731/1283124
        event.persist();
        this.delayedOnChange(event);
    }
    delayedOnChange(event){
        lastfm
            .findArtists(event.target.value)
            .then(artists => this.setState({artists: artists}));
    }

    render() {
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
                                onChange={this.onChange.bind(this)}
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