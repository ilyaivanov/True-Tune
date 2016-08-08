import React from 'react';
import './../../../node_modules/bootstrap/dist/css/bootstrap.css';
import './app.css';
import Player from './player/player';
import Sidebar from './sidebar/sidebar';
import SearchPage from '../searchPage';
import youtube from './../../loaders/youtube';
import Youtube from 'react-youtube';
import lastfm from './../../loaders/lastfm';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songInfo: {
                currentTime: 0,
                overallTime: 0,
                fullName: " . "
            },
            currentArtist: {},
            currentAlbum: {},
            currentTrack: {},
            artists: [],
            isPlaying: false
        }
    }

    updateProgress(songState) {
        this.setState({songInfo: songState});
    }

    playNextSong() {
        var indexOfCurrentTrack = _.indexOf(this.state.currentAlbum.tracks, this.state.currentTrack);
        if (indexOfCurrentTrack >= this.state.currentAlbum.tracks.length - 1)
            return;

        var track = this.state.currentAlbum.tracks[indexOfCurrentTrack + 1];
        this.setState({
            currentTrack: track
        }, this.playCurrentTrack.bind(this));
    }

    playPreviousSong() {
        var indexOfCurrentTrack = _.indexOf(this.state.currentAlbum.tracks, this.state.currentTrack);
        if (indexOfCurrentTrack <= 0)
            return;

        var track = this.state.currentAlbum.tracks[indexOfCurrentTrack - 1];
        this.setState({
            currentTrack: track
        }, this.playCurrentTrack.bind(this));
    }

    playCurrentTrack() {
        youtube.getVideoIdForTerm(`${this.state.currentArtist.name} - ${this.state.currentTrack.name}`)
            .then(v => this.player.loadVideoById(v.id));

        this.startTracking();
    }

    onPlayStart(artist, album, track) {
        this.setState({
            currentArtist: artist,
            currentAlbum: album,
            currentTrack: track
        });
        //change the state
        //send the state to youtube
        console.log(artist, album, track);
        youtube.getVideoIdForTerm(`${artist.name} - ${track.name}`)
            .then(v => this.player.loadVideoById(v.id));
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        this.player = event.target;
    }

    startTracking() {
        let updateProgress = function () {
            this.setCurrentTime(this.player.getCurrentTime());
        };

        this.stopTracking();
        console.log('Starting playing...');
        updateProgress.bind(this)();
        this.currentWatcher = setInterval(updateProgress.bind(this), 1000)
    }

    stopTracking(){
        if (this.currentWatcher) {
            console.log('stopping previous interval');
            clearInterval(this.currentWatcher);
            this.currentWatcher = 0;
        }
    }

    findArtists(term) {
        lastfm
            .findArtists(term)
            .then(artists => this.setState({artists: artists}));
    }

    findAlbums(artist) {
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

    findTracks(artist, album) {
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

    pause() {
        this.setState({
            isPlaying : false
        }, () => {
            this.stopTracking();
            this.player.pauseVideo();
        });
    }

    resume() {
        this.setState({
            isPlaying : true
        }, () => {
            this.startTracking();
            this.player.playVideo();
        });
    }
    setTrackTime(event){
        this.player.seekTo(event.target.value, true);
        this.setCurrentTime(event.target.value);
    }

    setCurrentTime(time){
        this.setState({
            songInfo: {
                currentTime: time,
                overallTime: this.player.getDuration(),
                fullName: this.player.getVideoData().title
            },
            isPlaying: true
        });
    }

    render() {
        let styles = {'marginBottom': 0};

        return (<div id="wrapper">
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={styles}>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="JavaScript:;">True Tune</a>
                </div>

                <Player songInfo={this.state.songInfo}
                        isPlaying={this.state.isPlaying}
                        playNextSong={this.playNextSong.bind(this)}
                        playPreviousSong={this.playPreviousSong.bind(this)}
                        pause={this.pause.bind(this)}
                        resume={this.resume.bind(this)}
                        setTrackTime={this.setTrackTime.bind(this)}
                />

                <Sidebar/>

            </nav>
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">

                        {/*Search Page*/}
                        <SearchPage
                            updateProgress={this.updateProgress.bind(this)}
                            onPlayStart={this.onPlayStart.bind(this)}
                            findArtists={this.findArtists.bind(this)}
                            findAlbums={this.findAlbums.bind(this)}
                            findTracks={this.findTracks.bind(this)}
                            artists={this.state.artists}/>

                    </div>
                </div>
            </div>
            <Youtube
                onReady={this._onReady.bind(this)}
                onPlay={this.resume.bind(this)}
                onPause={this.pause.bind(this)}
                onEnd={this.playNextSong.bind(this)}
                className="video-container"
            />
        </div>);
    }
}

export default App;