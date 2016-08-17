import React from 'react';
import './player.css';
import formatter from '../../common/time.formatter';
import Player from './../../models/player';

let player = props => (
    <form className="navbar-form navbar-left">
        <div className="btn-group player" role="group" aria-label="...">
            <button type="button" className="btn btn-default glyphicon glyphicon-backward" onClick={Player.playPreviousTrack}></button>
            {(props.isPlaying) ?
                (<button type="button" className="btn btn-default glyphicon glyphicon-pause" onClick={Player.pause}></button>) :
                (<button type="button" className="btn btn-default glyphicon glyphicon-play" onClick={Player.resume}></button>)
            }
            <button type="button" className="btn btn-default glyphicon glyphicon-forward" onClick={Player.playNextTrack}></button>
            <button type="button" className="btn btn-default range-btn">{formatter.formatTime(props.songInfo.currentTime)}</button>
            <div className="btn btn-default song-range range-btn">
                <div className="text-center song-title">{props.songInfo.fullName}</div>
                <div className="tracker">
                    <input type="range"
                           className="seek"
                           value={props.songInfo.currentTime}
                           max={props.songInfo.overallTime}
                           onChange={event => Player.setTrackTime(event.target.value)}/>
                </div>
            </div>
            <button type="button" className="btn btn-default range-btn">{formatter.formatTime(props.songInfo.overallTime)}</button>
            <button type="button" className="btn btn-default glyphicon glyphicon-volume-up"></button>
            <div className="btn btn-default volume-range range-btn">
                <input type="range" min="0" value="0" className="seek" max="198.844082" step="1.9884408199999999"/>
            </div>
        </div>
    </form>);

export default player;