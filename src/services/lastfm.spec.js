import * as requestStub from './../utils/request';
import {findArtists} from './lastfm';

describe('Mapping a url from a string a object of options', function () {
    it('should give a full url with properties as names and values as url values', function (done) {
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
            .then(() => done());
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