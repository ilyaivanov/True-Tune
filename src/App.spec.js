import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import App from './App';

describe('Having a form with two options', function () {
    var node;
    describe('should render a form', function () {
        beforeEach(function () {
            node = shallow(<App/>);
        });

        it('with two labels', function () {
            expect(node.find('div').text()).to.equal('Hello World');
        });
    });
});
