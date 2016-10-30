import React from 'react';
import {ArtistDetails, mapDispatchToProps}  from './ArtistDetails';
import {shallow} from 'enzyme';
import * as service from '../../services/lastfm';
import createStore from '../../store/create';

describe('Artist details page', function () {
    let params = {artistName: 'Cell'};

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
