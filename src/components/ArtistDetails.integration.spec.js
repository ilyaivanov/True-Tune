import React from 'react';
import {mount} from 'enzyme';
import Full from './ArtistDetails';
import Portlet from './ItemPortlet';
import {createDefaultAppStoreWithAlbums, createDefaultAppStore} from './../store/storeBuilder';

describe('Having two albums in a store', function () {
    it('should render a ArtistDetails with two portlets', function () {
        let store = createDefaultAppStoreWithAlbums([{name: 'foo', id: 1}, {name: 'bar', id: 2}]);
        let params = {artistName:'Carbon Based Lifeforms'};

        let node = mount(<Full store={store} params={params}/>);

        expect(node.find(Portlet).length).toBe(2);
    });
});


describe('Mounting an ArtistDetails without albums', function () {
    it('should dispatch an search albums action', function () {
        let store = createDefaultAppStore();
        var artistName = 'Carbon Based Lifeforms';
        let params = {artistName};

        store.dispatch = jasmine.createSpy('findAlbums');

        mount(<Full store={store} params={params}/>);

        expect(store.dispatch).toHaveBeenCalled();
    });
});
