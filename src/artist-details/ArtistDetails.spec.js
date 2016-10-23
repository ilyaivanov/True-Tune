import React from 'react';
import ArtistDetailsConnected, {ArtistDetails, mapDispatchToProps}  from './ArtistDetails';
import {mount, shallow} from 'enzyme';
import * as service from './../services/lastfm';
import createStore from './../store/create';

describe('Artist details page', function () {
    let store, params = {artistName: 'Cell'};

    describe('when navigated from web (without prepopulated artist)', function () {
        let node;
        beforeEach(function () {
            store = createStore();
            service.findAlbums = () => Promise.resolve([{name: 'myAlbum', id: '123'}]);// eslint-disable-line
            service.findInfo = () => Promise.resolve({name: 'Cell', url: 'my url'});// eslint-disable-line
        });

        it('should render artist name from route', function () {
            node = mount(<ArtistDetailsConnected store={store} params={params}/>);
            expect(node.find('h1').text()).toEqual('Cell');
        });

        it('should indicate that albums are loading', function (done) {
            store.subscribe(function () {
                expect(store.getState().artistDetails.isLoading).toEqual(true);
                done();
            });

            mount(<ArtistDetailsConnected store={store} params={params}/>);
        }, 50);

        it('should render albums from store', function (done) {
            node = mount(<ArtistDetailsConnected store={store} params={params}/>);

            //ignore first sync dispatch for setting isLoading
            store.subscribe(function () {
                expect(node.find('li').text()).toEqual('myAlbum');
                done();
            });
        }, 50);
    });

    describe('when rendered and props are being updated', function () {
        beforeEach(function () {
            store = createStore();

            service.findAlbums = jasmine.createSpy('findAlbums').and.returnValue(Promise.resolve([{ // eslint-disable-line
                name: 'myAlbum',
                id: '123'
            }]));
            service.findInfo = () => Promise.resolve({name: 'Cell', url: 'my url'});// eslint-disable-line
        });

        it('should trigger a service call for albums', function (done) {
            let node = mount(<ArtistDetailsConnected store={store} params={params}/>);

            //ignore first sync dispatch for setting isLoading
            let unsubscribe = store.subscribe(function () {
                expect(node.find('li').text()).toEqual('myAlbum');
                unsubscribe();
                updateAndVerify();
            });

            function updateAndVerify() {
                let spy;
                service.findAlbums = spy = jasmine.createSpy('findAlbums').and.returnValue(Promise.resolve([{ // eslint-disable-line
                    name: 'myDifferentAlbum',
                    id: '1234'
                }]));
                service.findInfo = () => Promise.resolve({name: 'Cell', image: 'my url'});// eslint-disable-line

                node.setProps({params: {artistName: 'new artist'}});

                store.subscribe(function () {
                    if (node.find('li').text() == 'myDifferentAlbum') {
                        expect(spy).toHaveBeenCalledWith('new artist');
                        done();
                    }
                });
            }

        }, 150);
    });


    describe('when clicking on a album link', function () {
        let selectAlbumSpy, node;
        beforeEach(function () {
            let albums = [
                {name: 'foo', id: "123", artistName: params.artistName}
            ];
            selectAlbumSpy = jasmine.createSpy('selectAlbum');
            node = shallow(<ArtistDetails loadArtistInfo={jasmine.createSpy()}
                                          loadAlbums={jasmine.createSpy()}
                                          selectAlbum={selectAlbumSpy}
                                          albums={albums}
                                          params={params}/>);
        });

        it('component should select album via artist name and album name', function () {
            let link = node.first().find('li').find('a');
            link.simulate('click');

            //Cell from params, foo from albums
            expect(selectAlbumSpy).toHaveBeenCalledWith('Cell', 'foo');
        });
    });



});

describe('selecting album', function () {
    let actions, store;
    beforeEach(function () {
        service.findTracks = jasmine.createSpy();// eslint-disable-line
        store = createStore();
        actions = mapDispatchToProps(store.dispatch);
    });

    it('should set Player Loading state to true', function (done) {
        store.subscribe(function () {
            expect(store.getState().player.isLoading).toEqual(true);
            done();
        });
        actions.selectAlbum('ArtistName', 'AlbumName');
    }, 25);


});

describe('when loading is finished', function () {
    let actions, store, resolvePromise;
    beforeEach(function () {
        let albumInfoPromise = new Promise(function (resolve) {
            resolvePromise = results => resolve(results);
        });
        service.findTracks = () => albumInfoPromise;// eslint-disable-line
        store = createStore();
        actions = mapDispatchToProps(store.dispatch);
    });

    it('should set Player Loading state to false', function (done) {
        //assert
        store.subscribe(function () {
            if(!store.getState().player.isLoading){
                expect(store.getState().player.selectedAlbum.name).toEqual('myAlbum');
                done();
            }
        });

        //act
        actions.selectAlbum('ArtistName', 'AlbumName');

        //arrange
        resolvePromise({
            name:'myAlbum',
            image:'imageUrl',
            tracks:[{name:'track1'}]
        });
    }, 50);

});