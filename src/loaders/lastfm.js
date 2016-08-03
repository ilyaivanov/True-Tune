import $ from 'jquery';
import logger from './../common/logger';
class lastfm {

    static findArtists(term) {
        var method = 'artist.search';
        this.log(method, `'${term}'`);

        return $
            .get(this.url, {method, artist: term})
            .then(response => response.results.artistmatches.artist.map(this.mapArtists))
            .then(artists => this.validateItems(artists, 'artists'));
    }

    static findAlbums(artistName) {
        var method = 'artist.getTopAlbums';
        this.log(method, `'${artistName}'`);

        return $
            .get(this.url, {method, artist: artistName})
            .then(response => response.topalbums.album)
            .then(albums => this.validateItems(albums, 'albums'));
    }

    static findTracks(album) {
        var artistName = album.artist.name;
        var albumName = album.name;

        var method = 'album.getInfo';
        this.log(method, `'${artistName}', '${albumName}'`);

        return $
            .get(this.url, {method, artist: artistName, album: albumName})
            .then(response => response.topalbums.album)
            .then(tracks => this.validateItems(tracks, 'tracks'));
    }

    static mapArtists(artist) {
        return {
            name: artist.name,
            id: artist.mbid,
            image: artist.image[1]['#text']
        };
    }

    static validateItems(items, setName) {
        items = items.filter(a => a.id);

        var duplicated = this.getDuplicated(items, 'id');
        if (duplicated) {
            logger.warn(`Found duplicated ${setName}\r\n` + duplicated);
            logger.warn('Taking the first artist by id');
            items = this.filterOutDuplicatedBy(items, 'id')
        }
        return items;
    }

    static getDuplicated(items, targetPropertyName) {
        return _
            .chain(items)
            .groupBy(item => item[targetPropertyName])
            .toPairs()
            .filter(pair => pair[1].length > 1)
            .map(pair => pair[0] + ' : [' + pair[1].map(i => i.name).join(', ') + ']')
            .join('\r\n')
            .value();
    }

    static filterOutDuplicatedBy(items, propertyName) {
        return _
            .chain(items)
            .groupBy(item => item[propertyName])
            .toPairs()
            .map(pair => pair[1][0])
            .value();
    }

    static log(methodName, params) {
        logger.log(`http request to lastfm. ${methodName}(${params})`)
    }

    static get url() {
        return 'http://ws.audioscrobbler.com/2.0?api_key=185032d80f1827034396b9acfab5a79f&format=json';
    }


    //Check unique mbid in all entities
    //probably use a different source of ids
}

export default lastfm;