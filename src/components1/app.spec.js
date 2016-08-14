import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import App from './app';

describe('App', () => {
    it('should have a sub-header called with nice to see ya', () => {
        const wrapper = shallow(<App />);

        let received = wrapper.find('h4').text();
        let expected = 'nice to see ya';

        expect(expected).to.equal(received);
    });

});