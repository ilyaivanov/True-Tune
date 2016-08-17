import $ from 'jquery';
import logger from '../common/logger';
class lastfm {

    static findArtists(term) {
        var method = 'artist.search';
        this.log(method, `'${term}'`);

        return $
            .get(this.url, {method, artist: term})
            .then(response => response.results.artistmatches.artist.map(this.mapItem))
            .then(artists => this.validateItems(artists, 'artists'));
    }

    static findAlbums(artistName) {
        var method = 'artist.getTopAlbums';
        this.log(method, `'${artistName}'`);

        return $
            .get(this.url, {method, artist: artistName})
            .then(response => response.topalbums.album.map(this.mapItem))
            .then(albums => this.validateItems(albums, 'albums'));
    }

    static findTracks(artistName, album) {
        var albumName = album.name;

        var method = 'album.getInfo';
        this.log(method, `'${artistName}', '${albumName}'`);

        return $
            .get(this.url, {method, artist: artistName, album: albumName})
            .then(response => response.album.tracks.track.map(this.mapTrack))
            .then(tracks => this.validateItems(tracks, 'tracks'));
    }

    static mapItem(item) {
        return {
            name: item.name,
            id: item.mbid,
            image: item.image[0]['#text'] //small image
        };
    }

    static mapTrack(item) {
        return {
            name: item.name,
            id: item.url
        };
    }

    static validateItems(items, setName) {
        var itemsWithId = items.filter(a => a.id);

        if (itemsWithId < items.length) {
            console.log(`ignoring ${items.length - itemsWithId} ${setName} with no id`);
        }

        var duplicated = this.getDuplicated(itemsWithId, 'id');
        if (duplicated) {
            logger.warn(`Found duplicated ${setName}\r\n` + duplicated);
            logger.warn('Taking the first artist by id');
            itemsWithId = this.filterOutDuplicatedBy(itemsWithId, 'id')
        }
        return itemsWithId;
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