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
            currentArtist:{},
            currentAlbum:{},
            currentTrack:{},

        }
    }

    updateProgress(songState) {
        this.setState({songInfo: songState});
    }

    playNextSong(){
        console.log('playNextSong');
    }

    playPreviousSong(){
        console.log('playPreviousSong');
    }

    onPlayStart(artist, album, track){
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
            this.setState({songInfo:{
                currentTime: this.player.getCurrentTime(),
                overallTime: this.player.getDuration(),
                fullName: this.player.getVideoData().title
            }});
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


    findArtists(){
        lastfm
            .findArtists(event.target.value)
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
                    {/*<a className="navbar-brand" href="JavaScript:;">True Tune</a>*/}
                    <a className="navbar-brand" href="JavaScript:;">{this.state.currentArtist.name}</a>
                </div>

                <Player songInfo={this.state.songInfo}
                        playNextSong={this.playNextSong.bind(this)}
                        playPreviousSong={this.playPreviousSong.bind(this)}
                />

                <Sidebar/>

            </nav>
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">

                        {/*Search Page*/}
                        <SearchPage updateProgress={this.updateProgress.bind(this)}
                        onPlayStart={this.onPlayStart.bind(this)}/>

                    </div>
                </div>
            </div>
            <Youtube
                onReady={this._onReady.bind(this)}
                onPlay={this.startTracking.bind(this)}
                className="video-container"
            />
        </div>);
    }
}

export default App;