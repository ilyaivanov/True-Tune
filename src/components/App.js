import React, {PropTypes as T} from 'react';
import Favorites from '../favotires/Favorites';
import './App.scss';
import SidebarControls from './SidebarControls';
import {connect} from "react-redux";
import cx from 'classnames';
import Player from './../Player/Player';
import {TOGGLE_NAVIGATION, TOGGLE_PLAYER} from './ui.reducer';

class App extends React.Component {

    static propTypes = {
        children: T.object.isRequired
    };

    render() {

        let albumInfo = {
            image : 'https://lastfm-img2.akamaized.net/i/u/174s/3165c2bc77c541fab89f8239462ea6e0.png',
            tracks : [
                {name:'foo', duration: 123, id:"123"},
                {name:'but', duration: 123, id:"1233"},
                {name:'buzz', duration: 123, id:"1243"},
                {name:'fobar', duration: 123, id:"1253"},
            ]
        }

        let props = this.props;
        let {playerShown, navigationShown} = props.ui;
        return (<div>
            <main className="page-content">
                <nav className={cx('navigation', {hidden: !navigationShown})}>
                    <Favorites/>
                </nav>

                <article className="page">
                    <SidebarControls ui={props.ui} togglePlayer={props.togglePlayer} toggleNavigation={props.toggleNavigation}/>
                    {props.children}
                </article>
                <aside className={cx('player-sidebar', {hidden: !playerShown})}>
                    <Player albumInfo={albumInfo}/>
                </aside>
            </main>
        </div>);
    }
}

function mapStateToProps({ui}) {
    return {ui};
}

function mapDispatchToProps(dispatch) {
    return {
        togglePlayer: () => dispatch({type: TOGGLE_PLAYER}),
        toggleNavigation: () => dispatch({type: TOGGLE_NAVIGATION}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
