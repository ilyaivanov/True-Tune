import createStore from './configureStore.prod';
import {initialState} from '../reducers';
import * as requestStub from './../../utils/request';


//Builder pattern to be implemented


/* eslint-disable */
//Assumes only findArtists search, add behaviour based on url
requestStub.requestGet = () => resolvedPromiseWith(lastfmSimplifiedResponse);
/* eslint-enable */

export function createDefaultAppStore(){
    return createStore(initialState);
}

export function createDefaultAppStoreWithAlbums(albums){
    initialState.albums = albums;
    return createStore(initialState);
}

function resolvedPromiseWith(data) {
    return new Promise(resolve => resolve(data));
}

let lastfmSimplifiedResponse = {
    results: {
        artistmatches: {
            artist: [
                {
                    name: 'Asura',
                    mbid: '2',
                    image: sampleImages()
                },
                {
                    name: 'DM Ashura',
                    mbid: '3',
                    image: sampleImages()
                }
            ]
        }
    }
};

function sampleImages() {
    return [
        {"#text": "smallUrl", "size": "small"},
        {"#text": "mediumUrl", "size": "medium"},
        {"#text": "largeUrl", "size": "large"},
        {"#text": "extralargeUrl", "size": "extralarge"},
        {"#text": "megaUrl", "size": "mega"}
    ];
}