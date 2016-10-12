import createStore from '../store/create';
import { startSearchingArtists, fetchArtistsFromServiceAsync } from './actions';
import * as service from './../services/lastfm';

describe('Having an initial state', function () {
    let store;
    beforeEach(function () {
        store = createStore();
    });

    it('artists should a empty', function () {
        expect(store.getState().search.artists.length).toEqual(0);
    });

    describe('when starting a artist search', function () {
        it('application should show a loading indicator', function (done) {
            store.subscribe(function () {
                expect(store.getState().search.isLoading).toEqual(true);
                done();
            });

            store.dispatch(startSearchingArtists('Asura'));
        }, 50);

        describe('when response from service is successfull', function () {
            beforeEach(function () {
                service.findArtists = (name) => Promise.resolve([{ name }]);
            });

            it('a bunch of artists should be shown at search results', function (done) {
                store.subscribe(function () {
                    expect(store.getState().search.artists).toEqual([{ name: 'fooo' }]);
                    done();
                });

                store.dispatch(fetchArtistsFromServiceAsync('fooo'));
            }, 50);
        });
    });
});
