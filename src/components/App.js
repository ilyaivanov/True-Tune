import React, {PropTypes as T} from 'react';
import Favorites from '../favotires/Favorites';
import './App.scss';
import SidebarControls from './SidebarControls';
import {connect} from "react-redux";
import cx from 'classnames';
import {TOGGLE_NAVIGATION, TOGGLE_PLAYER} from './ui.reducer';

class App extends React.Component {

    static propTypes = {
        children: T.object.isRequired
    };

    render() {
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
                <aside className={cx('player', {hidden: !playerShown})}>
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
