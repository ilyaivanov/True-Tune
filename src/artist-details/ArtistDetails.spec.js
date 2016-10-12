import React from 'react';
import ArtistDetails from './ArtistDetails';
import { mount } from 'enzyme';
import * as service from './../services/lastfm';
import createStore from './../store/create';

describe('Artist details page', function () {
    let store, params;
    beforeEach(function () {
        params = { artistName: 'Cell' };
        store = createStore();
    });

    describe('when navigated from web (without prepopulated artist)', function () {
        let node;
        beforeEach(function () {
            service.findAlbums = () => Promise.resolve([{ name: 'myAlbum', id: '123' }]);// eslint-disable-line
        });

        it('should render artist name from route', function () {
            node = mount(<ArtistDetails store={store} params={params}/>);
            expect(node.find('h1').text()).toEqual('Cell');
        });

        it('should indicate that albums are loading', function (done) {
            store.subscribe(function () {
                expect(store.getState().artistDetails.isLoading).toEqual(true);
                done();
            });

            mount(<ArtistDetails store={store} params={params}/>);
        }, 50);

        it('should render albums from store', function (done) {
            node = mount(<ArtistDetails store={store} params={params}/>);

            //ignore first sync dispatch for setting isLoading
            store.subscribe(function () {
                expect(node.find('li').text()).toEqual('myAlbum');
                done();
            });
        }, 50);
    });

    describe('when rendered and props are being updated', function () {
        beforeEach(function () {
            service.findAlbums = jasmine.createSpy('findAlbums').and.returnValue(Promise.resolve([{ name: 'myAlbum', id: '123' }]));// eslint-disable-line
        });

        it('should trigger a service call for albums', function (done) {
            let node = mount(<ArtistDetails store={store} params={params}/>);

            //ignore first sync dispatch for setting isLoading
            let unsubscribe = store.subscribe(function () {
                expect(node.find('li').text()).toEqual('myAlbum');
                unsubscribe();
                updateAndVerify();
            });

            function updateAndVerify() {
                let spy;
                service.findAlbums = spy = jasmine.createSpy('findAlbums').and.returnValue(Promise.resolve([{ name: 'myDifferentAlbum', id: '1234' }]));// eslint-disable-line

                node.setProps({ params: { artistName: 'new artist' } });

                //ignore first sync dispatch for setting isLoading
                store.subscribe(function () {
                    expect(spy).toHaveBeenCalledWith('new artist');
                    expect(node.find('li').text()).toEqual('myDifferentAlbum');
                    done();
                });
            }

        }, 150);
    });
});
