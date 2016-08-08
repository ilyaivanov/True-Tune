import React from 'react';
import {FormControl} from 'react-bootstrap';
import SearchResults from './searchResults';
import './../../node_modules/bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
import './searchPage.css';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.updateProgress = props.updateProgress;
        this.onPlayStart = props.onPlayStart;

        //use inlined lambdas here
        this.findArtists = props.findArtists;
        this.findAlbums = props.findAlbums;
        this.findTracks = props.findTracks;

        this.delayedOnChange = _.debounce(this.delayedOnChange, 300);
    }

    onChange(event) {
        //http://stackoverflow.com/a/28046731/1283124
        event.persist();
        this.delayedOnChange(event);
    }

    delayedOnChange(event) {
        if (event.target.value) {
            this.findArtists(event.target.value);
        }
    }

    toggleArtist(artist) {
        this.findAlbums(artist);
    }

    toggleAlbum(artist, album) {
        this.findTracks(artist, album);
    }

    playTrack(artist, album, track) {
        this.onPlayStart(artist, album, track);
    }

    render() {
        return (<div id="wrapper">
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

                            <SearchResults toggleArtist={this.toggleArtist.bind(this)}
                                           toggleAlbum={this.toggleAlbum.bind(this)}
                                           playTrack={this.playTrack.bind(this)}
                                           artists={this.state.artists}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default SearchPage;