//noinspection Eslint
import configureStore from '../store/configureStore';
import {selectArtist} from './actions';

describe('having an initial state', function () {
    describe('when selecting an artist', function () {
        it('it should stored in a state', function (done) {
            let store = configureStore({});

            store.subscribe(()=> {
                expect(store.getState().app.currentArtist).toEqual({name: 'Asura'});
                done();
            });

            store.dispatch(selectArtist({name: 'Asura'}));

        }, 50);
    });
});