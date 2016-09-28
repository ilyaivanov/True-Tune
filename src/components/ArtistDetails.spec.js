import React from 'react';
import {shallow, mount} from 'enzyme';
import Full, {ArtistDetails} from './ArtistDetails';
import Portlet from './ItemPortlet';
import {createStore} from 'redux';


describe('When navigating to a artist page with 2 albums', function () {
    it('ArtistDetails should render with two portlets', function () {
        var node = createNode();

        var portlets = node.find(Portlet);

        expect(portlets.length).toEqual(2);

        expect(portlets.at(0).props().link).toEqual('/artist/Carbon Based Lifeforms/foo');
        expect(portlets.at(1).props().link).toEqual('/artist/Carbon Based Lifeforms/bar');
    });

    it('should call a findAlbums on mounting', function () {
        var artistFind = jasmine.createSpy();
        createNode(artistFind);

        expect(artistFind).toHaveBeenCalledWith('Carbon Based Lifeforms');
    });
});


var createNode = function (artistFind = () => {}) {
    let albums = [{name: 'foo', id: 1}, {name: 'bar', id: 2}];
    let params = {artistName: 'Carbon Based Lifeforms'};

    return shallow(<ArtistDetails albums={albums} params={params} findAlbums={artistFind}/>);
};


import {createDefaultAppStoreWithAlbums} from './../store/storeBuilder';

//Integration tests
describe('Having two albums in a store', function () {
    it('should render a ArtistDetails with two portlets', function () {
        let store = createDefaultAppStoreWithAlbums([{name: 'foo', id: 1}, {name: 'bar', id: 2}]);
        let params = {artistName:'Carbon Based Lifeforms'};
        let node = mount(<Full store={store} params={params}/>);
        expect(node.find(Portlet).length).toBe(2);
    });
});
