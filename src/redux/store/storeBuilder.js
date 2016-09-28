import createStore from './configureStore.prod';
import state from '../reducers/initialState';
import * as requestStub from './../../utils/request';


//Builder pattern to be implemented


/* eslint-disable */
//Assumes only findArtists search, add behaviour based on url
requestStub.requestGet = () => resolvedPromiseWith(lastfmSimplifiedResponse);
/* eslint-enable */

export function createDefaultAppStore(){
    return createStore(state);
}

export function createDefaultAppStoreWithAlbums(albums){
    state.app.albums = albums;
    return createStore(state);
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