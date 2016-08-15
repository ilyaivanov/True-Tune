import _ from 'lodash';
import logger from './../common/logger';
import youtube from './youtube';
//public methods
//play(artist, album, track)
//playNext()
//playPrevious()
//resume()
//pause()
//sub/unsub

class PlayerModel {

    static play(artist, album, track) {
        this.currentArtist = artist;
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
        logger.log(`Playing: ${this.currentArtist.name} - ${this.currentAlbum.name} - ${this.currentTrack.name}`);
        youtube.getVideoIdForTerm(`${this.currentArtist.name} - ${this.currentTrack.name}`)
            .then(v => this.player.loadVideoById(v.id));

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

export default PlayerModel;