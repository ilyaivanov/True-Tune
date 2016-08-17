import _ from 'lodash';
import logger from './../common/logger';
import youtube from '../services/youtube';
//public methods
//play(artist, album, track)
//playNext()
//playPrevious()
//resume()
//pause()
//sub/unsub

class PlayerModel {

    static play(artistName, album, track) {
        this.currentArtistName = artistName;
        this.currentAlbum = album;
        this.currentTrack = track;

        this.playCurrentTrack();
    }

    static playNextTrack() {
        let indexOfCurrentTrack = _.indexOf(this.currentAlbum.tracks, this.currentTrack);
        if (indexOfCurrentTrack >= this.currentAlbum.tracks.length - 1)
            return;

        let track = this.currentAlbum.tracks[indexOfCurrentTrack + 1];
        this.currentTrack = track;
        this.playCurrentTrack();
    }

    static playPreviousTrack() {
        let indexOfCurrentTrack = _.indexOf(this.currentAlbum.tracks, this.currentTrack);
        if (indexOfCurrentTrack <= 0)
            return;

        let track = this.currentAlbum.tracks[indexOfCurrentTrack - 1];
        this.currentTrack = track;
        this.playCurrentTrack();
    }

    static pause() {
        //curently called two times: from ttplayer and from youtubeplayer
        logger.log('pausing');
        this.isPlaying = false;

        this.stopTrackingIfAny();
        this.player.pauseVideo();
        this.inform();
    }

    static resume() {
        //currently called two times: from ttplayer and from youtubeplayer
        logger.log('resuming');
        this.isPlaying = true;

        this.startTracking();
        this.player.playVideo();
        this.inform();
    }

    static startTracking() {
        this.stopTrackingIfAny();
        console.log('Starting playing...');

        this.currentWatcher = setInterval(this.inform.bind(this), 1000)
    }

    static stopTrackingIfAny() {
        if (this.currentWatcher) {
            console.log('stopping previous interval');
            clearInterval(this.currentWatcher);
            this.currentWatcher = 0;
        }
    }

    static getCurrentTrackState() {
        if (this.player)
            return {
                currentTime: this.player.getCurrentTime(),
                overallTime: this.player.getDuration(),
                fullName: this.player.getVideoData().title
            };
        return {
            currentTime: 0,
            overallTime: 0,
            fullName: ""
        };
    }

    static playCurrentTrack() {
        logger.log(`Playing: ${this.currentArtistName} - ${this.currentAlbum.name} - ${this.currentTrack.name}`);
        youtube.getVideoIdForTerm(`${this.currentArtistName} - ${this.currentTrack.name}`)
            .then(v => this.player.loadVideoById(v.id));

    }

    static setTrackTime(time){
        this.player.seekTo(time, true);
    }

    static onPlayStart(artist, album, track) {
        this.play(artist, album, track);
        //change the state
        //send the state to youtube
        youtube.getVideoIdForTerm(`${artist.name} - ${track.name}`)
            .then(v => this.player.loadVideoById(v.id));
    }

    static injectPlayer(player) {
        logger.log(`Injected player ${player}`);
        this.player = player;
    }

    static getCurrentTrack() {
        return this.currentTrack;
    }

    static getCurrentArtist() {
        return this.currentArtist;
    }

    static subscribe(onChange) {
        this.onChanges.push(onChange);
    }

    static unsubscribe(onChange) {
        this.onChanges = this.onChanges.slice(1, _.indexOf(this.onChanges, onChange));
    }

    static inform() {
        //store current state
        // Utils.store(this.key, this.todos);
        this.onChanges.forEach(cb => cb());
    }
}

PlayerModel.onChanges = [];

//set binding to public methods
//avoiding using bind from clients onClick={Player.playPreviousTrack.bind(Player)}
//                      and allows onClick={Player.playPreviousTrack}
//maybe consider using loops to enumerate own static properties
PlayerModel.pause = PlayerModel.pause.bind(PlayerModel);
PlayerModel.resume = PlayerModel.resume.bind(PlayerModel);
PlayerModel.playPreviousTrack = PlayerModel.playPreviousTrack.bind(PlayerModel);
PlayerModel.playNextTrack = PlayerModel.playNextTrack.bind(PlayerModel);


export default PlayerModel;