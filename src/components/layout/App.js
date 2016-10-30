import React, { PropTypes as T } from 'react';
import { connect } from "react-redux";
import cx from 'classnames';

import Favorites from '../favotires/Favorites';
import SidebarControls from './SidebarControls';
import Player from '../playlist/Player';
import BottomPlayer from '../player/Player';

import { TOGGLE_NAVIGATION, TOGGLE_PLAYER } from '../../store/reducer';

import { playTrack, loadYoutubeTrack } from '../player/actions';
import { togglePlayer, toggleNavigation } from './actions';

import './App.scss';
class App extends React.Component {

    static propTypes = {
        children: T.object.isRequired
    };

    render() {
        let props = this.props;
        let albumInfo = props.app.selectedAlbum;
        let { playerShown, navigationShown } = props.app;
        return (<div className="application-body">
            <main className="page-content">
                <nav className={cx('navigation', { hidden: !navigationShown })}>
                    <Favorites/>
                </nav>

                <article className="page">
                    <SidebarControls ui={props.app} togglePlayer={props.togglePlayer}
                                     toggleNavigation={props.toggleNavigation}/>
                    {props.children}
                </article>
                <aside className={cx('player-sidebar', { hidden: !playerShown })}>
                    <Player albumInfo={albumInfo} trackIndex={props.app.currentTrackIndex}
                            onTrackPlay={props.onTrackPlay}/>
                </aside>
            </main>


            <footer className="page-footer">
                <BottomPlayer/>
            </footer>
        </div>);
    }
}

function mapStateToProps({ app }) {
    return { app };
}

function mapDispatchToProps(dispatch) {
    return {
        togglePlayer,
        toggleNavigation,
        onTrackPlay: (artist, album, track) => {
            dispatch(playTrack(artist, album, track.name));
            dispatch(loadYoutubeTrack(artist, album, track.name));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
