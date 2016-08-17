import React from 'react';
import './../../node_modules/bootstrap/dist/css/bootstrap.css';
import Player from './player/player';
import classnames from 'classnames';
import Sidebar from './sidebar/sidebar';
import SearchPage from './pages/searchPage';
import Youtube from 'react-youtube';
import Playlist from './pages/playlist';

import PlayerModel from './../models/player'
import ArtistsModel from './../models/artists'
import PlaylistsModel from './../models/playlists'
import UI from './../models/ui'

import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        PlayerModel.subscribe(() => this.forceUpdate());
        ArtistsModel.subscribe(() => this.forceUpdate());
        PlaylistsModel.subscribe(() => this.forceUpdate());
        UI.subscribe(() => this.forceUpdate());
    }

    render() {
        var currentPlaylist = PlaylistsModel.getSelectedPlaylists();
        let styles = {'marginBottom': 0};
        let page = currentPlaylist ? <Playlist playlist={currentPlaylist}/> :
            <SearchPage artists={ArtistsModel.artists}
                        playlists={PlaylistsModel.getPlaylists()}/>;

        return (<div>
            {/*<nav className="navbar navbar-default navbar-static-top" role="navigation" style={styles}>*/}
                {/*<div className="navbar-header">*/}
                    {/*<button type="button" className="navbar-toggle" data-toggle="collapse"*/}
                            {/*data-target=".navbar-collapse">*/}
                        {/*<span className="sr-only">Toggle navigation</span>*/}
                        {/*<span className="icon-bar"></span>*/}
                        {/*<span className="icon-bar"></span>*/}
                        {/*<span className="icon-bar"></span>*/}
                    {/*</button>*/}
                    {/*<a className="navbar-brand" href="JavaScript:;">True Tune</a>*/}
                {/*</div>*/}

                {/*<Player songInfo={PlayerModel.getCurrentTrackState()}*/}
                        {/*isPlaying={PlayerModel.isPlaying}/>*/}

                {/*<Sidebar playlists={PlaylistsModel.getPlaylists()}/>*/}

            {/*</nav>*/}
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                        <button id="hide-playlists"
                                className={classnames('navbar-btn btn btn-default glyphicon', {'glyphicon-arrow-left':UI.arePlaylistsVisible, 'glyphicon-arrow-right':!UI.arePlaylistsVisible})}
                                onClick={() => UI.togglePlaylists()}></button>
                    </div>

                    <div className="collapse navbar-collapse">


                        <ul className="nav navbar-nav">

                            <li className="active"><a href="JavaScript:;" onClick={e => PlaylistsModel.selectPlaylist(undefined)}>Search</a></li>
                        </ul>
                        <Player songInfo={PlayerModel.getCurrentTrackState()} isPlaying={PlayerModel.isPlaying}/>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-cog"></span> <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Separated link</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid">
                <div className={classnames('row', {'no-playlists' : !UI.arePlaylistsVisible})}>
                    <div className="col-fixed-240">
                        <Sidebar playlists={PlaylistsModel.getPlaylists()}/>
                    </div>
                    <div className="col-md-12 col-offset-240">
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