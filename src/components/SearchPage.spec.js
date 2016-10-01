import React from 'react';
import {shallow} from "enzyme";
import SearchPage from './SearchPage';

describe('Having a search page', function () {
    let node, callbackSpy;

    beforeEach(function () {
        callbackSpy = jasmine.createSpy('onChange');
        node = shallow(<SearchPage onSearch={callbackSpy} artists={[]}/>);
    });

    describe('changing it input field once', function () {
        it('should trigger a callback only after 500 ms', function (done) {
            node.find('input').simulate('change', {target: {value: 'my text'}});

            expect(callbackSpy).not.toHaveBeenCalled();

            setTimeout(function checkHaveBeenCalled() {
                expect(callbackSpy).toHaveBeenCalledWith('my text');
                done();
            }, 550);
        });
    });
});