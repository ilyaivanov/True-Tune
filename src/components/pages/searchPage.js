import React from 'react';
import Artist from './../artist';
import {FormControl} from 'react-bootstrap';
import _ from 'lodash';
import './searchPage.css';
import './searchResults.css';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.onPlayStart = props.onPlayStart;

        //use inlined lambdas here
        this.findArtists = props.findArtists;
        this.findAlbums = artist => props.findAlbums(artist);
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

                            <div className="list-group list-group-root well">
                                {this.props.artists.map(artist => <Artist key={artist.id}
                                                                          playlists={this.props.playlists}
                                                                          artist={artist}
                                                                          toggleArtist={this.findAlbums.bind(this)}
                                                                          toggleAlbum={this.findTracks.bind(this)}/>)}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default SearchPage;