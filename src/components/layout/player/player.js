import React from 'react';
import './player.css';

let player = props => (<ul className="nav navbar-top-links navbar-right">
    <li>
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
            <i className="glyphicon glyphicon-backward"></i>
        </a>
    </li>
    <li>
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
            <i className="glyphicon glyphicon-pause"></i>
        </a>
    </li>
    <li>
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
            <i className="glyphicon glyphicon-forward"></i>
        </a>
    </li>
    <li>00:03</li>
    <li>
        <div className="songName">Artist - name of the song</div>
        <div>
            <input type="range" />
        </div>
    </li>
    <li>04:38</li>
    <li className="navbar-right">
        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
            <i className="glyphicon glyphicon-cog"></i>
        </a>
    </li>
</ul>);

export default player;