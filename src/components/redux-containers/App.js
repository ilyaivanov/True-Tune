import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Player from '../Player';
import Playlist from './../Playlist/Playlist';


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
                        <Playlist playlists={this.props.playlist.items}/>
                        <button>Create</button>
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
        albumInfo: state.app.albumInfo,
        playlist: state.playlist
    };
}

export default connect(
    mapStateToProps
)(App);

