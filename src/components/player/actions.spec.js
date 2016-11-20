import createStore from "./../../store/create";
import { playTrack, playNextTrack, playPreviousTrack } from './actions';

describe('Having an album of three tracks', function () {
    let store, app;

    beforeEach(function () {
        app = {
            selectedAlbum: {
                tracks: [
                    { name: 'myTrack1' },
                    { name: 'myTrack2' },
                    { name: 'myTrack3' },
                ]
            },
            trackIndex: 0
        };
    });

    describe('when clicking on a track', function () {
        beforeEach(function () {
            store = createStore({ app });
        });
        it('it should be highlighted', function (done) {
            store.subscribe(function () {
                expect(store.getState().app.trackIndex).toEqual(1);
                done();
            });
            store.dispatch(playTrack('foo', 'bar', 'myTrack2'));
        }, 50);

    });

    describe('when playing next track', function () {

        describe('and current track is second', function () {
            beforeEach(function () {
                app.trackIndex = 1;
                store = createStore({ app });
            });
            it('should highlight third track', function (done) {
                store.subscribe(function () {
                    expect(store.getState().app.trackIndex).toEqual(2);
                    done();
                });
                store.dispatch(playNextTrack());
            }, 50);
        });

        describe('and current track is the last', function () {
            beforeEach(function () {
                app.trackIndex = 2;
                store = createStore({ app });
            });
            it('should not change track index', function (done) {
                store.subscribe(function () {
                    expect(store.getState().app.trackIndex).toEqual(2);
                    done();
                });
                store.dispatch(playNextTrack());
            }, 50);
        });
    })

    describe('when playing previous track', function () {

        describe('and current track is first', function () {
            beforeEach(function () {
                app.trackIndex = 0;
                store = createStore({ app });
            });
            it('should not change index', function (done) {
                store.subscribe(function () {
                    expect(store.getState().app.trackIndex).toEqual(0);
                    done();
                });
                store.dispatch(playPreviousTrack());
            }, 50);
        });

        describe('and current track is the second', function () {
            beforeEach(function () {
                app.trackIndex = 1;
                store = createStore({ app });
            });
            it('should set track index to first', function (done) {
                store.subscribe(function () {
                    expect(store.getState().app.trackIndex).toEqual(0);
                    done();
                });
                store.dispatch(playPreviousTrack());
            }, 50);
        });
    });

});
