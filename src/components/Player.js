import React from 'react';
import './../../node_modules/font-awesome/css/font-awesome.css';
import './Player.scss';

export default class Player extends React.Component {

    render() {
        return <div>

            <div className="track-progress-container">
                <div className="track-progress" style={{ width: 455 }}/>
            </div>
            <div className="bottom-player-items">
                <i className="fa fa-step-backward" aria-hidden="true"/>
                <i className="fa fa-play" aria-hidden="true"/>
                <i className="fa fa-step-forward" aria-hidden="true"/>
                <i className="fa fa-cogs" aria-hidden="true"/>
                0:30/2:43
                <span>Cell</span> - <span>Album</span> - <span>Track</span>

                <i className="fa fa-volume-down" aria-hidden="true"/>
                <input type="range" min="0" max="100"/>
                <i className="fa fa-volume-up" aria-hidden="true"/>
            </div>
        </div>
    }

}