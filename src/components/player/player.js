import React from 'react';
import './player.css';
import formatter from '../../common/time.formatter';
import Player from './../../models/player';

let player = props => (<ul className="nav navbar-top-links navbar-right">
    <li>
        <a className="dropdown-toggle" data-toggle="dropdown" href="#" onClick={Player.playPreviousTrack.bind(Player)}>
            <i className="glyphicon glyphicon-backward"></i>
        </a>
    </li>
    <li>
        {(props.isPlaying) ?
            (<a className="dropdown-toggle" data-toggle="dropdown" href="#" onClick={Player.pause.bind(Player)}>
                <i className="glyphicon glyphicon-pause"></i>
            </a>) :
            (<a className="dropdown-toggle" data-toggle="dropdown" href="#" onClick={Player.resume.bind(Player)}>
                <i className="glyphicon glyphicon-play"></i>
            </a>)
        }
    </li>
    <li>
        <a className="dropdown-toggle" data-toggle="dropdown" href="#" onClick={Player.playNextTrack.bind(Player)}>
            <i className="glyphicon glyphicon-forward"></i>
        </a>
    </li>
    <li>{formatter.formatTime(props.songInfo.currentTime)}
    </li>
    <li>
        <div className="songName">{props.songInfo.fullName}</div>
        <div>
            <input type="range"
                   value={props.songInfo.currentTime}
                   max={props.songInfo.overallTime}
                   onChange={event => PlayerModel.setTrackTime(event.target.value)}/>
        </div>
    </li>
    <li>{formatter.formatTime(props.songInfo.overallTime)}</li>
    <li className="navbar-right">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
            <i className="glyphicon glyphicon-cog"></i>
        </a>
    </li>
</ul>);

export default player;