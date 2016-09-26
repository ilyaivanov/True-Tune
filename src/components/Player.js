import React from 'react';
import formatTime from './../utils/timeFormat';
import classnames from 'classnames';
import findYoutubeVideo from './../services/youtube';

export default class Player extends React.Component {

    trackClicked(track){
        findYoutubeVideo('Carbon Based Lifeforms', track.name)
            .then(console.log);
    }

    mapTrack(track, index) {
        return (
            <div key={track.id}
                 className={classnames('player-item', {active: index == 3})}
                 onClick={() => this.trackClicked(track)}>
                {index + 1}. {track.name}
                <small>{formatTime(track.duration)}</small>
            </div>);
    }

    render() {
        return (
            <div>
                <img src={this.props.album.image}/>
                <div className="player">
                    <div className="track-progress-container">
                        <div className="track-progress" style={{width: '33%'}}/>
                    </div>
                    <div style={{textAlign: 'center'}}>
                        Real &amp; True <br />
                        <small>0:35 - 3:45</small>
                    </div>
                    <div className="controls">
                        <i className="fa fa-step-backward" aria-hidden="true"/>
                        <i className="fa fa-play" aria-hidden="true"/>
                        <i className="fa fa-step-forward" aria-hidden="true"/>
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
            </div>);
    }

}