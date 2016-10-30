import React, { PropTypes as T } from 'react';
import Favorites from '../favotires/Favorites';
import './App.scss';
import SidebarControls from './SidebarControls';
import { connect } from "react-redux";
import cx from 'classnames';
import Player from '../player/Player';
import BottomPlayer from './Player/Player';
import { TOGGLE_NAVIGATION, TOGGLE_PLAYER } from './../store/reducer';
import { playTrack, loadYoutubeTrack } from './../components/Player/reducer';
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
                    <Player albumInfo={albumInfo} trackIndex={props.app.currentTrackIndex} onTrackPlay={props.onTrackPlay}/>
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
        togglePlayer: () => dispatch({ type: TOGGLE_PLAYER }),
        onTrackPlay: (artist, album, track) => {
            dispatch(playTrack(artist, album, track.name));
            dispatch(loadYoutubeTrack(artist, album, track.name));
        },
        toggleNavigation: () => dispatch({ type: TOGGLE_NAVIGATION }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
