import React from 'react';
import {shallow} from 'enzyme';
import ArtistDetails from './ArtistDetails';
import Portlet from './ItemPortlet';

describe('When navigating to a artist page with 2 albums', function () {
    it('ArtistDetails should render with two portlets', function () {
        let node = createNode();

        let portlets = node.find(Portlet);

        expect(portlets.length).toEqual(2);
    });
});

let createNode = function () {
    let albums = [{name: 'foo', id: 1}, {name: 'bar', id: 2}];

    return shallow(<ArtistDetails albums={albums} name="Carbon Based Lifeforms"/>);
};