import $ from 'jquery';
class lastfm  {
    static findAlbums(artistName) {
        return $.get('http://ws.audioscrobbler.com/2.0?method=artist.getTopAlbums&api_key=185032d80f1827034396b9acfab5a79f&format=json&artist='+artistName)
            .then(response => response.topalbums.album);
    }

    static findTracks(album) {
        var artistName = album.artist.name;
        var albumName = album.name;
        return $.get('http://ws.audioscrobbler.com/2.0?method=album.getInfo&api_key=185032d80f1827034396b9acfab5a79f&format=json&artist='+artistName+'&album='+albumName)
            .then(response => response.topalbums.album);
    }
}

export default lastfm;