import React from 'react';
import './player.css';
import formatter from './../../../common/formatter';

let playButton = isPlaying => isPlaying ? (
    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
        <i className="glyphicon glyphicon-pause"></i>
    </a>) : (
    <a className="dropdown-toggle" data-toggle="dropdown" href="#">
        <i className="glyphicon glyphicon-play"></i>
    </a>);


let player = props => (<ul className="nav navbar-top-links navbar-right">
    <li>
        <a className="dropdown-toggle" data-toggle="dropdown" href="#" onClick={props.playPreviousSong}>
            <i className="glyphicon glyphicon-backward"></i>
        </a>
    </li>
    <li>
        {(props.isPlaying) ?
            (<a className="dropdown-toggle" data-toggle="dropdown" href="#" onClick={props.pause}>
                <i className="glyphicon glyphicon-pause"></i>
            </a>) :
            (<a className="dropdown-toggle" data-toggle="dropdown" href="#" onClick={props.resume}>
                <i className="glyphicon glyphicon-play"></i>
            </a>)
        }
    </li>
    <li>
        <a className="dropdown-toggle" data-toggle="dropdown" href="#" onClick={props.playNextSong}>
            <i className="glyphicon glyphicon-forward"></i>
        </a>
    </li>
    <li>{formatter.formatTime(props.songInfo.currentTime)}
    </li>
    <li>
        <div className="songName">{props.songInfo.fullName}</div>
        <div>
            <input type="range" value={props.songInfo.currentTime} max={props.songInfo.overallTime}/>
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