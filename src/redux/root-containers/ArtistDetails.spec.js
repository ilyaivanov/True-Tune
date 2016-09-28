import React from 'react';
import {shallow, mount} from 'enzyme';
import {ArtistDetails} from './ArtistDetails';
import Portlet from '../../components/ItemPortlet';
import {createStore} from 'redux';


describe('When navigating to a artist page with 2 albums', function () {
    it('ArtistDetails should render with two portlets', function () {
        var node = createNode();

        var portlets = node.find(Portlet);

        expect(portlets.length).toEqual(2);

        expect(portlets.at(0).props().link).toEqual('/artist/Carbon Based Lifeforms/foo');
        expect(portlets.at(1).props().link).toEqual('/artist/Carbon Based Lifeforms/bar');
    });
});


var createNode = function () {
    let _ = () => {};
    let albums = [{name: 'foo', id: 1}, {name: 'bar', id: 2}];
    let params = {artistName: 'Carbon Based Lifeforms'};

    return shallow(<ArtistDetails albums={albums} params={params} findAlbums={_} findArtist={_}/>);
};

describe('Having a ArtistDetails component', function () {
    describe('when only artist name is provided', function () {
        it('findAlbums and findArtistInfo should be called', function () {
            var findArtist = jasmine.createSpy('findArtist'),
                findAlbums = jasmine.createSpy('findAlbums');
            let params = {artistName:'Asura'};
            var node = shallow(<ArtistDetails params={params}
                                              findAlbums={findAlbums}
                                              findArtist={findArtist}/>);

            expect(findAlbums).toHaveBeenCalledWith('Asura');
            expect(findArtist).toHaveBeenCalledWith('Asura');
        });
    });
});