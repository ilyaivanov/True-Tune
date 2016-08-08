import React from 'react';
import './../../../node_modules/bootstrap/dist/css/bootstrap.css';
import './app.css';
import Player from './player/player';
import Sidebar from './sidebar/sidebar';
import SearchPage from '../searchPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songInfo: {
                currentTime: 0,
                overallTime: 0,
                fullName: " . "
            },
            currentSong: 'foo'

        }
    }

    updateProgress(songState) {
        this.setState({songInfo: songState});
    }

    playNextSong(){
        console.log('playNextSong');
        this.setState({currentSong: this.state.currentSong + 'next'});
    }

    playPreviousSong(){
        console.log('playPreviousSong');
    }

    render() {
        let styles = {'marginBottom': 0};

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
                    {/*<a className="navbar-brand" href="JavaScript:;">True Tune</a>*/}
                    <a className="navbar-brand" href="JavaScript:;">{this.state.currentSong}</a>
                </div>

                <Player songInfo={this.state.songInfo}
                        playNextSong={this.playNextSong.bind(this)}
                        playPreviousSong={this.playPreviousSong.bind(this)}
                />

                <Sidebar/>

            </nav>
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">

                        {/*Search Page*/}
                        <SearchPage updateProgress={this.updateProgress.bind(this)}/>

                    </div>
                </div>
            </div>
        </div>);
    }
}

export default App;