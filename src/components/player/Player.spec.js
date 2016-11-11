import 'react';
import { shallow, mount } from 'enzyme';
import ConnectedPlayer, { Player } from './Player';
import createStore from './../../store/create';
import { PLAY_PREVIOUS_TRACK } from '../../store/reducer';

describe('In a Player', function () {
    describe('when user click next track', function () {
        it('track index should be incremented', function () {
            let spy = jasmine.createSpy('onClick');

            let player = shallow(<Player playNextTrack={spy} player={{}}/>);

            let forward = player.find('.fa-step-forward');
            forward.simulate('click');

            expect(spy).toHaveBeenCalled();
        });
    });

    describe('When clicking backward on a conencted player', function () {
        it('action should be dispatched', function () {
            let store = createStore();
            store.dispatch = jasmine.createSpy('dispatch');
            let player = mount(<ConnectedPlayer store={store}/>);

            let forward = player.find('.fa-step-backward');
            forward.simulate('click');

            expect(store.dispatch).toHaveBeenCalledWith({ type: PLAY_PREVIOUS_TRACK });
        });
    });
});
