import React from 'react';
import formatTime from './../utils/timeFormat';
import cx from 'classnames';
import './Player.scss';
export default class Player extends React.Component {
    mapTrack = (track, index) => (
        <div key={track.id}
             className={cx('player-item', { active: this.props.trackIndex == index })}
             onClick={() => this.props.onTrackPlay(this.props.albumInfo.artistName, this.props.albumInfo.name, track)}>
            <span className="track-index">{index + 1}.</span>{track.name}
            <small>{formatTime(track.duration)}</small>
        </div>);


    render() {
        if (!this.props.albumInfo) {
            return <div></div>;
        }
        return (
            <div>
                <img src={this.props.albumInfo.image}/>
                <div className="album-info">
                    <div style={{ textAlign: 'center' }}>
                        <b>{this.props.albumInfo.artistName}</b> <br />
                        {this.props.albumInfo.name} <br />
                    </div>
                </div>
                <div className="player-list">
                    {this.props.albumInfo.tracks.map(this.mapTrack)}
                </div>
            </div>);
    }

}
