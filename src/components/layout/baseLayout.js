import React from 'react';
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './baseLayout.css'
import Player from './player/player'
import Sidebar from './sidebar/sidebar'
import App from './../app'

class BaseLayout extends React.Component {
    render() {
        var styles = {'marginBottom': 0};

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

                <Player />

                <Sidebar/>

            </nav>
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">

                        {/*Search Page*/}
                        <App/>

                    </div>
                </div>
            </div>
        </div>);
    }
}

export default BaseLayout;