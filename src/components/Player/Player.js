import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Youtube from 'react-youtube';

import { togglePlay, playNextTrack, playPreviousTrack } from './actions';

import '../../../node_modules/font-awesome/css/font-awesome.css';
import './Player.scss';

export class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            video: {}
        };
    }

    componentDidMount() {
        setInterval(this.syncProgressWithThePlayer, 100);
    }

    setPlayer(player) {
        this.setState({ player });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.player.video && newProps.player.video.id != this.state.video.id) {
            this.setState({ video: newProps.player.video });
        }
    }

    play = () => {
        this.state.player.playVideo();
        this.props.togglePlay(true);
    };

    pause = () => {
        this.state.player.pauseVideo();
        this.props.togglePlay(false);
    };

    getPlayButton = () => {
        if (this.props.player.isPlaying)
            return <i className="fa fa-pause" onClick={this.pause}/>;
        else
            return <i className="fa fa-play" onClick={this.play}/>;
    };

    syncProgressWithThePlayer = () => {
        let { player } = this.state;
        if (player) {
            let percent = player.getCurrentTime() / player.getDuration() * 100;
            this.setState({ width: percent });
        }
    };

    render() {
        let isYoutubeHidden = false;
        let { trackName, albumName, artistName } = this.props;

        const opts = {
            height: '150',
            width: '220',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        return <div>
            <div className="track-progress-container">
                <div className="track-progress" style={{ width: this.state.width + 'vw' }}/>
            </div>
            <div className="bottom-player-items">
                <div className="playerText">
                    <span>{artistName}</span>{' '}>{' '}
                    <span>{albumName}</span>{' '}>{' '}
                    <span>{trackName}</span>
                </div>
                <i className="fa fa-step-backward" onClick={this.props.playPreviousTrack}/>
                {this.getPlayButton()}
                <i className="fa fa-step-forward" onClick={this.props.playNextTrack}/>
            </div>
            <div className="player-container">
                <Youtube className={cx({ hidden: isYoutubeHidden })}
                         videoId={this.state.video.id}
                         opts={opts}
                         onEnd={this.props.playNextTrack}
                         onReady={e => this.setPlayer(e.target)}
                />
            </div>
        </div>;
    }

}
// onReady={e => this.setPlayer(e.target)}
// onPlay={this.onPlay.bind(this)}
// onEnd={this.onEnd.bind(this)}
// onPause={this.onPause.bind(this)}
let mapStateToProps = (state) => ({
    player: state.app,
    artistName: state.app.artist ? state.app.artist.name : '',
    albumName: state.app.selectedAlbum ? state.app.selectedAlbum.name : '',
    trackName: (state.app.selectedAlbum && state.app.trackIndex >= 0) ? state.app.selectedAlbum.tracks[state.app.trackIndex].name : '',
});

const map = {
    playNextTrack,
    playPreviousTrack,
    togglePlay,
};

export default connect(mapStateToProps, map)(Player);
