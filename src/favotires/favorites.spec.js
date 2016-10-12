import createStore from './../store/create';
import { add } from './actions';
describe('When adding an item to a favorites', function () {
    it('it should be added to a list of favories', function (done) {
        let store = createStore();
        store.subscribe(function () {
            expect(store.getState().favorites).toEqual([{ name: 'myFAvoriteArtist' }]);
            done();
        });
        store.dispatch(add({ name: 'myFAvoriteArtist' }))
    }, 50);


    describe('when adding again the same item (samy by id)', function () {
        it('it should ignore it without errors', function (done) {
            let store = createStore({
                favorites:[{ name: 'myFAvoriteArtist', id:'42' }]
            });
            store.subscribe(function () {
                expect(store.getState().favorites).toEqual([{ name: 'myFAvoriteArtist', id:'42' }]);
                done();
            });
            store.dispatch(add({ name: 'myFAvoriteArtist', id:'42' }))
        }, 50);
    });
});
