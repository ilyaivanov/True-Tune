import reducer from './appReducer';
import initialState from './initialState';
import {SEARCH_ARTISTS_DONE} from './../constants/actionTypes';

describe('Having an initial state', function () {
    it('when artists search is done then should be assinged to a state', function () {
        var receivedState = reducer(initialState, {
            type: SEARCH_ARTISTS_DONE,
            artists: [{name: 'artist1'}, {name: 'artist2'}]
        });

        expect(receivedState.artists).toEqual([{name: 'artist1'}, {name: 'artist2'}]);
    });
});