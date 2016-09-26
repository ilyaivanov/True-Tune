import React from 'react';
import Youtube from 'react-youtube';

import formatTime from './../utils/timeFormat';
import classnames from 'classnames';
import findYoutubeVideo from './../services/youtube';

export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentVideo: {},
            currentTrack: {},
            currentTime: 0,
            overallTime: 0,
            player: null, //exclude from shouldComponentUpdate
            currentIntervalId: null //exclude from shouldComponentUpdate,
        };
    }

    playTrack(track) {
        this.setState({ currentTrack: track, currentTime: 0, overallTime:0});
        findYoutubeVideo(this.props.artist.name, track.name)
            .then(video => this.setState({currentVideo: video}),
                error => this.setState({currentTrack: {}}));
    }

    mapTrack(track, index) {
        return (
            <div key={track.id}
                 className={classnames('player-item', {active: this.state.currentTrack.id == track.id})}
                 onClick={() => this.playTrack(track)}>
                {index + 1}. {track.name}
                <small>{formatTime(track.duration)}</small>
            </div>);
    }

    setPlayer(player) {
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
        var currentIndex = this.props.tracks.indexOf(this.state.currentTrack);
        if (currentIndex < this.props.tracks.length - 1)
            this.playTrack(this.props.tracks[currentIndex + 1]);
    }

    playPrevious() {
        var currentIndex = this.props.tracks.indexOf(this.state.currentTrack);
        if (currentIndex > 0)
            this.playTrack(this.props.tracks[currentIndex - 1]);
    }

    clearCurrentInterval() {
        if (this.state.currentIntervalId) {
            clearInterval(this.state.currentIntervalId);
            this.setState({currentIntervalId: null});
        }
    }

    onEnd() {
        //play next song
        console.log('end');
    }

    render() {
        const opts = {
            height: '150',
            width: '220',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        var currentDurationPercent = (this.state.currentTime / this.state.overallTime * 100) + '%';
        return (
            <div>
                <img src={this.props.album.image}/>
                <div className="player">
                    <div className="track-progress-container">
                        <div className="track-progress" style={{width: currentDurationPercent || 0}}/>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        {this.state.currentTrack.name} <br />
                        <small>{formatTime(this.state.currentTime)} - {formatTime(this.state.overallTime)}</small>
                    </div>
                    <div className="controls">
                        <i className="fa fa-step-backward" aria-hidden="true" onClick={this.playPrevious.bind(this)}/>
                        {this.state.currentIntervalId ?
                            (<i className="fa fa-pause" aria-hidden="true" onClick={this.pause.bind(this)}/>) :
                            (<i className="fa fa-play" aria-hidden="true" onClick={this.play.bind(this)}/>)
                        }
                        <i className="fa fa-step-forward" aria-hidden="true" onClick={this.playNext.bind(this)}/>
                    </div>
                    <div className="volume-meter">
                        <i className="fa fa-volume-down" aria-hidden="true"/>
                        <input type="range"/>
                        <i className="fa fa-volume-up" aria-hidden="true"/>
                    </div>
                </div>
                <div className="player-list">
                    {this.props.tracks.map(this.mapTrack.bind(this))}
                </div>
                <div className="player-container">
                    <Youtube videoId={this.state.currentVideo.id}
                             opts={opts}
                             onReady={e => this.setPlayer(e.target)}
                             onPlay={this.onPlay.bind(this)}
                             onEnd={this.onEnd.bind(this)}
                             onPause={this.onPause.bind(this)}/>
                </div>

            </div>);
    }

}