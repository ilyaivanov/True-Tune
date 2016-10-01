import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Player from '../Player';

class App extends React.Component {
    render() {
        let player;
        if(this.props.albumInfo){
            player = <Player albumInfo={this.props.albumInfo}/>
        }
        return (
            <div>
                <main className="page-content">
                    <nav className="content-navigation" >
                        1233
                    </nav>

                    <article className="content-article">
                        {this.props.children}
                    </article>
                    <aside className="content-sidebar">
                        {player}
                    </aside>

                </main>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element,
    albumInfo: PropTypes.object
};


function mapStateToProps(state) {
    return {
        albumInfo: state.app.albumInfo
    };
}

export default connect(
    mapStateToProps
)(App);