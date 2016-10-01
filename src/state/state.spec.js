//noinspection Eslint
import createStore from './store/configureStore';
import {searchForArtists} from './reducers/actions';
import {setRequestCreator} from './../utils/request';
import {sampleImages} from './../utils/test/lastfm.response.samples';


describe('Having an initial state', function () {
    let store;
    beforeEach(function () {
        setRequestCreator(() => ({
            open: () => {
            },

            send: function () {
                this.response = JSON.stringify({
                    results: {
                        artistmatches: {artist: [{name: 'Asura-like', mbid: 1, image: sampleImages()}]}
                    }
                });
                this.status = 200;
                this.onload();
            }
        }));

        store = createStore();
    });
    it('when searching for asura it should populate a list or artists', function (done) {
        store.subscribe(() => {
            let state = store.getState();
            expect(state.app.artists).toEqual([{name: "Asura-like", id: 1, image: sampleImages()[2]['#text']}]);
            done();
        });

        searchForArtists('Asura')(store.dispatch).catch(fail);
    }, 50);
});