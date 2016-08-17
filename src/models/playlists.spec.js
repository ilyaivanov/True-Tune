import {expect} from 'chai';
import _ from 'lodash';
import Playlists from './playlists';

xdescribe('Adding an item to a playlist', function () {
    it('should add that item to a playlist (Captain Obvious)', function () {
        Playlists.createPlaylist();
        var playlist = _.first(Playlists.getPlaylists());
        var newArtist1 = {type:'artist', name:'foo'};
        var newArtist2 = {type:'artist', name:'bar'};

        Playlists.addTo(playlist, newArtist1);
        Playlists.addTo(playlist, newArtist2);

        Playlists.removeItem(playlist, newArtist1);

        expect(playlist.items).to.have.length(1);
        expect(playlist.items[0]).to.be(newArtist2);
    });
});
