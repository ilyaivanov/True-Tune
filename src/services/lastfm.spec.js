import * as requestStub from './../utils/request';
import {findArtists} from './lastfm';

describe('Having a sample lastfm response for artist.search', function () {
    it('service should return a mapped array with large images', function (done) {
        /* eslint-disable */
        requestStub.requestGet = () => resolvedPromiseWith(lastfmSimplifiedResponse);
        /* eslint-enable */

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
                        },
                        {
                            name: 'This is ignored because of no images'
                        },
                        {
                            name: 'This is ignored because of empty images',
                            image: []
                        },
                        {
                            name: 'This is ignored because of only small images',
                            image: [{}, {}]
                        }
                    ]
                }
            }
        };

        let expectedArtists = [
            {name: 'Asura', id: '2', image: "largeUrl"},
            {name: 'DM Ashura', id: '3', image: "largeUrl"}
        ];

        findArtists('carbon')
            .then(artists => expect(artists).toEqual(expectedArtists))
            .then(() => done(), failAndDone(done));
    });
});


function sampleImages() {
    return [
        {"#text": "smallUrl", "size": "small"},
        {"#text": "mediumUrl", "size": "medium"},
        {"#text": "largeUrl", "size": "large"},
        {"#text": "extralargeUrl", "size": "extralarge"},
        {"#text": "megaUrl", "size": "mega"}
    ];
}

function resolvedPromiseWith(data) {
    return new Promise(resolve => resolve(data));
}

function failAndDone(done) {
    return error => {
        fail(error);
        done();
    };
}