import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Youtube from 'react-youtube';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import './Player.scss';
import { ON_PLAY_CHANGE } from './../../store/reducer';


export class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            video: {}
        };
    }
    componentWillMount(){
        setInterval(this.syncProgressWithThePlayer, 100);
    }
    setPlayer(player) {
        this.setState({ player });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.player.video && newProps.player.video.id != this.state.video.id){
            console.log(newProps)
            this.setState({ video: newProps.player.video });
        }
    }

    play = () => {
        this.state.player.playVideo();
        this.props.togglePlay(true);
    };

    pause = () => {
        this.state.player.pauseVideo();
        this.props.togglePlay(false);
    };

    getPlayButton = () => {
        if (this.props.player.isPlaying)
            return <i className="fa fa-pause" onClick={this.pause}/>;
        else
            return <i className="fa fa-play" onClick={this.play}/>;
    };

    syncProgressWithThePlayer = () => {
        let {player} = this.state;
        if(player){
            let percent = player.getCurrentTime() / player.getDuration() * 100;
            this.setState({width: percent });
        }
    }

    render() {
        let props = this.props;
        let isYoutubeHidden = false;
        let { trackName, albumName, artistName } = this.props.player;

        const opts = {
            height: '150',
            width: '220',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };
        return <div>
            <div className="track-progress-container">
                <div className="track-progress" style={{ width: this.state.width+'vw' }}/>
            </div>
            <div className="bottom-player-items">
                <i className="fa fa-step-backward"/>
                {this.getPlayButton()}
                <i className="fa fa-step-forward"/>
                <i className="fa fa-cogs"/>
                0:30/2:43
                <span>{artistName}</span> -
                <span>{albumName}</span> -
                <span>{trackName}</span>
                <i className="fa fa-volume-down"/>
                <input type="range" min="0" max="100"/>
                <i className="fa fa-volume-up"/>
            </div>
            <div className="player-container">
                <Youtube className={cx({ hidden: isYoutubeHidden })}
                         videoId={this.state.video.id}
                         opts={opts}
                         onReady={e => this.setPlayer(e.target)}
                />
            </div>
        </div>;
    }

}
// onReady={e => this.setPlayer(e.target)}
// onPlay={this.onPlay.bind(this)}
// onEnd={this.onEnd.bind(this)}
// onPause={this.onPause.bind(this)}
let mapStateToProps = (state) => ({
    player: state.app
});
let mapDispatchToPros = dispatch => ({
    togglePlay: (isPlaying) => dispatch({ type: ON_PLAY_CHANGE, isPlaying })
});
export default connect(mapStateToProps, mapDispatchToPros)(Player);
