import * as React from 'react';
import * as cx from 'classnames';
import 'font-awesome/css/font-awesome.css';
// import Youtube from 'react-youtube';
import formatTime from './../utils/timeFormat';
// import findYoutubeVideo from './../services/youtube';


export default class Player extends React.Component<Album, {}> {
    playPrevious = () => {

    }

    pause = () => {

    }
    play = () => {

    }
    playNext = () => {

    }
    onVolumeChange = (e) => { }
    renderTrack = (track: Track, index: number) => (
        <div key={track.id}
            className={cx('player-item', { active: track.isActive })}>
            <span className="track-index">{index + 1}. </span>{track.name}
            <small>{formatTime(track.duration)}</small>
        </div>
    )


    render() {
        const currentDurationPercent = 33;
        const currentTrack = { name: 'fooo' };
        const currentTime = 3213;
        const overallTime = 3213;
        const volume = 100;

        return (
            <div>
                <img src={this.props.image} />
                <div className="player">
                    <div className="track-progress-container">
                        <div className="track-progress" style={{ width: currentDurationPercent || 0 }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {currentTrack.name} <br />
                        <small>{formatTime(currentTime)}- {formatTime(overallTime)}</small>
                    </div>
                    <div className="controls">
                        <i className="fa fa-step-backward" />
                        <i className="fa fa-play" />
                        <i className="fa fa-step-forward" />
                    </div>
                    <div className="volume-meter">
                        <i className="fa fa-volume-down" />
                        <input type="range" min="0" max="100" value={volume} onChange={e => this.onVolumeChange("32")} />
                        <i className="fa fa-volume-up" />
                    </div>
                </div>
                <div className="player-list">
                    {this.props.tracks.map(this.renderTrack)}
                </div>
            </div>);
    }

}

// <div className="player-container">
//                     <Youtube className={cx({ hidden: isYoutubeHidden })}
//                         videoId={currentVideo.id}
//                         opts={opts}
//                         onReady={e => this.setPlayer(e.target)}
//                         onPlay={this.onPlay.bind(this)}
//                         onEnd={this.onEnd.bind(this)}
//                         onPause={this.onPause.bind(this)} />
//                 </div>