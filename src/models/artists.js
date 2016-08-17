import lastfm from '../services/lastfm';
import _ from 'lodash';

class ArtistsModel {

    static findArtists(term) {
        lastfm
            .findArtists(term)
            .then(artists => {
                this.artists = artists;
                this.inform();
            });
    }

    static findAlbums(artist) {
        if (!artist.albums) {
            lastfm.findAlbums(artist.name)
                .then(albums => {
                    artist.albums = albums;
                    albums.forEach(a => a.artistName = artist.name);
                    artist.areAlbumsShown = !artist.areAlbumsShown;
                    this.inform();
                })
        } else {
            artist.areAlbumsShown = !artist.areAlbumsShown;
            this.inform();
        }
    }

    static findTracks(album) {
        if (!album.tracks) {
            lastfm.findTracks(album.artistName, album)
                .then(tracks => {
                    album.tracks = tracks;
                    _.each(tracks, t => t.albumName = album.name);
                    _.each(tracks, t => t.artistName = album.artistName);
                    album.areTracksShown = !album.areTracksShown;
                    this.inform();
                })
        } else {
            album.areTracksShown = !album.areTracksShown;
            this.inform();
        }
    }


    static subscribe(onChange) {
        this.onChanges.push(onChange);
    }

    static inform() {
        this.onChanges.forEach(cb => cb());
    }


}

ArtistsModel.artists = [];

ArtistsModel.onChanges = [];

export default ArtistsModel;