import React from 'react';
import './../../node_modules/bootstrap/dist/css/bootstrap.css';
import './app.css';
import Player from './player/player';
import Sidebar from './sidebar/sidebar';
import SearchPage from './pages/searchPage';
import youtube from '../services/youtube';
import Youtube from 'react-youtube';
import lastfm from '../services/lastfm';
import Playlist from './pages/playlist';

import PlayerModel from './../models/player'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            playlists: [
                {name: "Playlist 1", items: []},
                {name: "Playlist 2", items: []},
                {name: "Playlist 3", items: []}
            ],
            currentPlaylist: undefined
        };

        PlayerModel.subscribe(() => this.forceUpdate());
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

    createPlaylist() {
        var newPlaylist = {name: "new playlist", items: []};
        var newPlaylists = this.state.playlists;
        newPlaylists.push(newPlaylist);
        this.setState({playlists: newPlaylists});
    }

    editPlaylist(playlist) {
        playlist.isEditing = true;
        this.forceUpdate();
    }

    stopEditingPlaylist(playlist) {
        console.log(playlist);
        playlist.isEditing = false;
        this.forceUpdate();
    }

    setPlaylistName(playList, name) {
        playList.name = name;
        this.forceUpdate();
    }

    addTo(playlist, item) {
        playlist.items.push(item);
        console.log(playlist, item);
    }

    selectPlaylist(playlist) {
        this.setState({currentPlaylist: playlist});
    }

    render() {

        let styles = {'marginBottom': 0};
        let page = this.state.currentPlaylist ? <Playlist playlist={this.state.currentPlaylist}/> :
            <SearchPage
                onPlayStart={PlayerModel.play.bind(PlayerModel)}
                findArtists={this.findArtists.bind(this)}
                findAlbums={this.findAlbums.bind(this)}
                findTracks={this.findTracks.bind(this)}
                addTo={this.addTo.bind(this)}
                artists={this.state.artists}
                playlists={this.state.playlists}/>;

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

                <Player songInfo={PlayerModel.getCurrentTrackState()}
                        isPlaying={PlayerModel.isPlaying}
                        playNextSong={PlayerModel.playNextTrack.bind(PlayerModel)}
                        playPreviousSong={PlayerModel.playPreviousTrack.bind(PlayerModel)}
                        pause={PlayerModel.pause.bind(PlayerModel)}
                        resume={PlayerModel.resume.bind(PlayerModel)}
                        setTrackTime={event => PlayerModel.setTrackTime(event.target.value)}
                />

                <Sidebar playlists={this.state.playlists}
                         createPlaylist={this.createPlaylist.bind(this)}
                         editPlaylist={this.editPlaylist.bind(this)}
                         stopEditingPlaylist={this.stopEditingPlaylist.bind(this)}
                         setPlaylistName={this.setPlaylistName.bind(this)}
                         selectPlaylist={this.selectPlaylist.bind(this)}
                />

            </nav>
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">

                        {page}


                    </div>
                </div>
            </div>
            <Youtube
                onReady={e => PlayerModel.injectPlayer(e.target)}
                onPlay={PlayerModel.resume.bind(PlayerModel)}
                onPause={PlayerModel.pause.bind(PlayerModel)}
                onEnd={PlayerModel.playNextTrack.bind(PlayerModel)}
                className="video-container"
            />
        </div>);
    }
}

export default App;