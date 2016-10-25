import React from 'react';
import { connect } from 'react-redux';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import './Player.scss';
import Youtube from 'react-youtube';
import cx from 'classnames';

export class Player extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            video:{}
        }
    }
    setPlayer(player) {
        player.setVolume(0.5);
    }

    componentWillReceiveProps(newProps){
        if(newProps.video && newProps.video.id != this.state.video.id)
            this.setState({video:newProps.video});
    }

    render() {
        let isYoutubeHidden = true;
        let {trackName, albumName, artistName, video} = this.props.player;
        const opts = {
            height: '150',
            width: '220',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
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
                <span>{artistName}</span> -
                <span>{albumName}</span> -
                <span>{trackName}</span>

                <i className="fa fa-volume-down" aria-hidden="true"/>
                <input type="range" min="0" max="100"/>
                <i className="fa fa-volume-up" aria-hidden="true"/>
            </div>
            <div className="player-container">
                <Youtube className={cx({ hidden: isYoutubeHidden })}
                         videoId={this.state.video.id}
                         opts={opts}
                         onReady={e => this.setPlayer(e.target)}
                         />
            </div>
        </div>
    }

}
// onReady={e => this.setPlayer(e.target)}
// onPlay={this.onPlay.bind(this)}
// onEnd={this.onEnd.bind(this)}
// onPause={this.onPause.bind(this)}
let mapStateToProps = (state) => ({
    player: state.bottomPlayer
});

export default connect(mapStateToProps, null)(Player);