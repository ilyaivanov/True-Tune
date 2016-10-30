import createStore from "./../../store/create";
import { playTrack } from './actions';

describe('When clicking on a track', function () {
    let store;

    beforeEach(function () {
        let app = {
            selectedAlbum: {
                tracks: [
                    { name: 'myTrack1' },
                    { name: 'myTrack2' }]
            },
            currentTrackIndex: 0
        };
        store = createStore({app});
    });

    it('it should be highlighted', function (done) {
        store.subscribe(function () {
            expect(store.getState().app.trackIndex).toEqual(1);
            done();
        });
        store.dispatch(playTrack('foo', 'bar', 'myTrack2'));
    }, 50);

});
