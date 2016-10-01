import configureStore from '../store/configureStore.prod';
import * as redux from './index';

describe('having an initial state', function () {
    describe('when selecting an artist', function () {
        it('it should stored in a state', function (done) {
            let store = configureStore({});

            store.subscribe(()=> {
                expect(store.getState().app.currentArtist).toEqual({name: 'Asura'});
                done();
            });

            store.dispatch(redux.selectArtist({name: 'Asura'}));

        }, 50);
    });
});