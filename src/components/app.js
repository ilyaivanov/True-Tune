import React from 'react';
import './../../node_modules/bootstrap/dist/css/bootstrap.css';
import './app.css';
import Player from './player/player';
import Sidebar from './sidebar/sidebar';
import SearchPage from './pages/searchPage';
import Youtube from 'react-youtube';
import Playlist from './pages/playlist';

import PlayerModel from './../models/player'
import ArtistsModel from './../models/artists'
import PlaylistsModel from './../models/playlists'

class App extends React.Component {
    constructor(props) {
        super(props);

        PlayerModel.subscribe(() => this.forceUpdate());
        ArtistsModel.subscribe(() => this.forceUpdate());
        PlaylistsModel.subscribe(() => this.forceUpdate());
    }

    navigateToFindArtistPage(){
        PlaylistsModel.selectPlaylist(undefined);
    }

    render() {
        var currentPlaylist = PlaylistsModel.getSelectedPlaylists();
        let styles = {'marginBottom': 0};
        let page = currentPlaylist ? <Playlist
            playlists={PlaylistsModel.getPlaylists()}
            playlist={currentPlaylist}
            playTrack={PlayerModel.play.bind(PlayerModel)}
            addTo={PlaylistsModel.addTo.bind(PlaylistsModel)}
            toggleAlbum={ArtistsModel.findTracks.bind(ArtistsModel)}
            toggleArtist={ArtistsModel.findAlbums.bind(ArtistsModel)}
        /> :
            <SearchPage
                onPlayStart={PlayerModel.play.bind(PlayerModel)}
                findArtists={ArtistsModel.findArtists.bind(ArtistsModel)}
                findAlbums={ArtistsModel.findAlbums.bind(ArtistsModel)}
                findTracks={ArtistsModel.findTracks.bind(ArtistsModel)}
                addTo={PlaylistsModel.addTo.bind(PlaylistsModel)}
                artists={ArtistsModel.artists}
                playlists={PlaylistsModel.getPlaylists()}/>;

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

                <Sidebar playlists={PlaylistsModel.getPlaylists()}
                         findArtists={this.navigateToFindArtistPage.bind(this)}
                         createPlaylist={PlaylistsModel.createPlaylist.bind(PlaylistsModel)}
                         editPlaylist={PlaylistsModel.editPlaylist.bind(PlaylistsModel)}
                         stopEditingPlaylist={PlaylistsModel.stopEditingPlaylist.bind(PlaylistsModel)}
                         setPlaylistName={PlaylistsModel.setPlaylistName.bind(PlaylistsModel)}
                         selectPlaylist={PlaylistsModel.selectPlaylist.bind(PlaylistsModel)}
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