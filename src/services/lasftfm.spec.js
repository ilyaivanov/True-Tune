import { findArtists } from './lastfm';

describe('When trying to find an artist', function () {
    it('last.fm should return search results', function (done) {
        findArtists('Asura')
            .then(artists => expect(artists[0].name).toEqual('Asura'))
            .then(done);
    }, 1500);
});
