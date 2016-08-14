import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import App from './app';

describe('<App />', () => {
    it('should have a header called \'About\'', () => {
        const wrapper = shallow(<App />);

        var received = wrapper.find('h4').text();
        var expected = 'some contents';

        expect(received).to.equal(expected);
    });

});