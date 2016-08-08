import React from 'react';
import lastfm from './../loaders/lastfm';
import {FormControl} from 'react-bootstrap';
import SearchResults from './searchResults';
import './../../node_modules/bootstrap/dist/css/bootstrap.css';
import _ from 'lodash';
import Youtube from 'react-youtube';
import './app.css';
import youtube from './../loaders/youtube';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {artists: []};
        this.updateProgress = props.updateProgress;
        this.delayedOnChange = _.debounce(this.delayedOnChange, 300);
    }

    onChange(event) {
        //http://stackoverflow.com/a/28046731/1283124
        event.persist();
        this.delayedOnChange(event);
    }

    delayedOnChange(event) {
        if (event.target.value) {
            lastfm
                .findArtists(event.target.value)
                .then(artists => this.setState({artists: artists}));
        }
    }

    toggleArtist(artist) {
        if (!artist.albums) {
            lastfm.findAlbums(artist.name)
                .then(albums => {
                    artist.albums = albums;
                    artist.areAlbumsShown = !artist.areAlbumsShown;
                    this.forceUpdate();
                })
        } else {
            artist.areAlbumsShown = !artist.areAlbumsShown;
            this.forceUpdate();
        }
    }

    toggleAlbum(artist, album) {
        if (!album.tracks) {
            lastfm.findTracks(artist, album)
                .then(albums => {
                    album.tracks = albums;
                    album.areTracksShown = !album.areTracksShown;
                    this.forceUpdate();
                })
        } else {
            album.areTracksShown = !album.areTracksShown;
            this.forceUpdate();
        }
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        this.player = event.target;
    }

    playTrack(artist, album, track) {
        youtube.getVideoIdForTerm(`${artist.name} - ${track.name}`)
            .then(v => this.player.loadVideoById(v.id));
    }

    startTracking() {
        let updateProgress = function () {
            this.updateProgress({
                currentTime: this.player.getCurrentTime(),
                overallTime: this.player.getDuration(),
                fullName: this.player.getVideoData().title
            });
        };

        if(this.currentWatcher){
            console.log('stopping previous interval');
            clearInterval(this.currentWatcher);
            this.currentWatcher = 0;
        }
        console.log('Starting playing...');
        updateProgress.bind(this)();
        this.currentWatcher = setInterval(updateProgress.bind(this), 1000)
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
                            <Youtube
                                onReady={this._onReady.bind(this)}
                                onPlay={this.startTracking.bind(this)}
                                className="video-container"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default App;