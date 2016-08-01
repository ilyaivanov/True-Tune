import $ from 'jquery';
class lastfm  {
    static findAlbums(artist) {
        return $.get('http://ws.audioscrobbler.com/2.0?method=artist.getTopAlbums&api_key=185032d80f1827034396b9acfab5a79f&format=json&artist='+artist)
            .then(response => response.topalbums.album);
    }
}

export default lastfm;