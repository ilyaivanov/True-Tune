import _ from 'lodash';
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
    }

    static playNextTrack() {
        let indexOfCurrentTrack = _.indexOf(this.currentAlbum.tracks, this.currentTrack);
        if (indexOfCurrentTrack >= this.currentAlbum.tracks.length - 1)
            return;

        let track = this.currentAlbum.tracks[indexOfCurrentTrack + 1];
        this.currentTrack = track;
    }

    static playPreviousSong() {
        let indexOfCurrentTrack = _.indexOf(this.currentAlbum.tracks, this.currentTrack);
        if (indexOfCurrentTrack <= 0)
            return;

        let track = this.currentAlbum.tracks[indexOfCurrentTrack - 1];
        this.currentTrack = track;
    }

    static playCurrentTrack() {
        youtube.getVideoIdForTerm(`${this.state.currentArtist.name} - ${this.state.currentTrack.name}`)
            .then(v => this.player.loadVideoById(v.id));

    }

    static onPlayStart(artist, album, track) {
        this.play(artist, album, track);
        //change the state
        //send the state to youtube
        youtube.getVideoIdForTerm(`${artist.name} - ${track.name}`)
            .then(v => this.player.loadVideoById(v.id));
    }

    static injectPlayer(player){
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