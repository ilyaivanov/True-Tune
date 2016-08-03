import $ from 'jquery';
class lastfm {
    static findArtists(term) {
        console.log('http request to lastfm. artist.search(\'' + term + '\')');
        return $
            .get("http://ws.audioscrobbler.com/2.0?method=artist.search&api_key=185032d80f1827034396b9acfab5a79f&format=json&artist=" + term)
            .then(response => response.results.artistmatches.artist.map(this.mapArtists))
            .then(artists => this.validateItems(artists, 'artists'));
    }

    static findAlbums(artistName) {
        return $
            .get('http://ws.audioscrobbler.com/2.0?method=artist.getTopAlbums&api_key=185032d80f1827034396b9acfab5a79f&format=json&artist=' + artistName)
            .then(response => response.topalbums.album)
            .then(albums => this.validateItems(albums, 'albums'));
    }

    static findTracks(album) {
        var artistName = album.artist.name;
        var albumName = album.name;
        return $
            .get('http://ws.audioscrobbler.com/2.0?method=album.getInfo&api_key=185032d80f1827034396b9acfab5a79f&format=json&artist=' + artistName + '&album=' + albumName)
            .then(response => response.topalbums.album)
            .then(tracks => this.validateItems(tracks, 'tracks'));
    }

    static mapArtists(artist){
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
            console.warn(`Found duplicated ${setName}\r\n` + duplicated);
            console.warn('Taking the first artist by id');
            items = this.filterOutDuplicatedBy(items, 'id')
        }
        return items;
    }

    static getDuplicated(items, targetPropertyName) {
        var duplicated = _.chain(items)
            .groupBy(i => i[targetPropertyName])
            .toPairs()
            .filter(pair => pair[1].length > 1)
            .map(pair => pair[0] + ' : [' + pair[1].map(i => i.name).join(', ') + ']')
            .join('\r\n')
            .value();
        return duplicated;
    }

    static filterOutDuplicatedBy(items, propertyName) {
        return _.chain(items)
            .groupBy(i => i[propertyName])
            .toPairs()
            .map(pair => pair[1][0])
            .value();
    }

    //Check unique mbid in all entities
    //probably use a different source of ids
}

export default lastfm;