import {expect, assert} from 'chai';
import Player from './player';

//figure out how to inject fake youtube service
xdescribe('Having a player with artist, album and tracks', () => {
    let artist = {
        albums: [{
            tracks: [
                {name: 'first'},
                {name: 'second'}
            ]
        }]
    };

    describe('and a non-last track is being played', () => {
        beforeEach(function(){
            Player.play(artist, artist.albums[0], artist.albums[0].tracks[0]);
        });

        it('playing next track should switch to next track', function () {
            Player.playNextTrack();

            var expectedTrack = artist.albums[0].tracks[1];
            var receivedNextTrack = Player.getCurrentTrack();

            expect(receivedNextTrack).to.deep.equal(expectedTrack);
        });
    });

    describe('and a last track is being played', function () {
        beforeEach(function(){
            Player.play(artist, artist.albums[0], artist.albums[0].tracks[1]);
        });

        it('playing next track should not switch to next track', function () {
            Player.playNextTrack();

            var expectedTrack = artist.albums[0].tracks[1];
            var receivedNextTrack = Player.getCurrentTrack();

            expect(receivedNextTrack).to.deep.equal(expectedTrack);
        });
    });
});


describe('subscribing for on changes', function () {
    it('should trigger callback on inform', function () {
        //can't figure out how to introduce sinon or jasmine spy to webpack configuration
        var called = false;
        var callback = () => called = true;

        Player.subscribe(callback);
        Player.inform();

        expect(called).to.be.ok;
    });
});
