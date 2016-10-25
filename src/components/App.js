import React, { PropTypes as T } from 'react';
import Favorites from '../favotires/Favorites';
import './App.scss';
import SidebarControls from './SidebarControls';
import { connect } from "react-redux";
import cx from 'classnames';
import Player from '../player/Player';
import BottomPlayer from './Player/Player';
import { TOGGLE_NAVIGATION, TOGGLE_PLAYER } from './ui.reducer';
import { playTrack, loadYoutubeTrack } from './../components/Player/reducer';
class App extends React.Component {

    static propTypes = {
        children: T.object.isRequired
    };

    render() {
        let props = this.props;
        let albumInfo = props.albumInfo;
        let { playerShown, navigationShown } = props.ui;
        return (<div className="application-body">
            <main className="page-content">
                <nav className={cx('navigation', { hidden: !navigationShown })}>
                    <Favorites/>
                </nav>

                <article className="page">
                    <SidebarControls ui={props.ui} togglePlayer={props.togglePlayer}
                                     toggleNavigation={props.toggleNavigation}/>
                    {props.children}
                </article>
                <aside className={cx('player-sidebar', { hidden: !playerShown })}>
                    <Player albumInfo={albumInfo} onTrackPlay={props.onTrackPlay}/>
                </aside>
            </main>


            <footer className="page-footer">
                <BottomPlayer/>
            </footer>
        </div>);
    }
}

function mapStateToProps({ ui, player }) {
    return { ui, albumInfo: player.selectedAlbum };
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
