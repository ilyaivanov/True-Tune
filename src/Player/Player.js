import React from 'react';
import formatTime from './../utils/timeFormat';
import cx from 'classnames';
import './../../node_modules/font-awesome/css/font-awesome.css';
import './Player.scss';
export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentVideo: {},
            currentTrack: {},
            currentTime: 0,
            overallTime: 0,
            volume: 50,
            player: null, //exclude from shouldComponentUpdate
            currentIntervalId: null //exclude from shouldComponentUpdate,
        };
    }

    mapTrack(track, index) {
        return (
            <div key={track.id}
                 className={cx('player-item', {active: this.state.currentTrack.id == track.id})}
                 onClick={() => this.props.onTrackPlay(this.props.albumInfo.artistName, this.props.albumInfo.name, track)}>
                <span className="track-index">{index + 1}.</span>{track.name}
                <small>{formatTime(track.duration)}</small>
            </div>);
    }

    setPlayer(player) {
        player.setVolume(this.state.volume);
        this.setState({player});
    }

    onPlay() {
        this.clearCurrentInterval();
        var currentIntervalId = setInterval(() => this.setState({
            currentTime: this.state.player.getCurrentTime()
        }), 1000);
        this.setState({currentIntervalId, overallTime: this.state.player.getDuration()})
    }

    //TODO: make sure clearCurrentInterval is called from component will unmount
    onPause() {
        this.clearCurrentInterval();
    }

    play() {
        this.state.player.playVideo();
        this.onPlay();
    }

    pause() {
        this.state.player.pauseVideo();
        this.onPause();
    }

    playNext() {
        var currentIndex = this.props.albumInfo.tracks.indexOf(this.state.currentTrack);
        if (currentIndex < this.props.albumInfo.tracks.length - 1)
            this.playTrack(this.props.albumInfo.tracks[currentIndex + 1]);
    }

    playPrevious() {
        var currentIndex = this.props.albumInfo.tracks.indexOf(this.state.currentTrack);
        if (currentIndex > 0)
            this.playTrack(this.props.albumInfo.tracks[currentIndex - 1]);
    }

    clearCurrentInterval() {
        if (this.state.currentIntervalId) {
            clearInterval(this.state.currentIntervalId);
            this.setState({currentIntervalId: null});
        }
    }

    onEnd() {
        this.playNext();
    }

    onVolumeChange(volume) {
        this.state.player.setVolume(volume);
        this.setState({volume})
    }

    render() {
        if(!this.props.albumInfo){
            return <div></div>;
        }
        var currentDurationPercent = (this.state.currentTime / this.state.overallTime * 100) + '%';
        return (
            <div>
                <img src={this.props.albumInfo.image}/>
                <div className="album-info">
                    <div style={{textAlign: 'center'}}>
                        <b>{this.props.albumInfo.artistName}</b> <br />
                        {this.props.albumInfo.name} <br />
                    </div>
                </div>
                <div className="player-list">
                    {this.props.albumInfo.tracks.map(this.mapTrack.bind(this))}
                </div>
            </div>);
    }

}