import requestGet from './../utils/request';
import _ from 'lodash';

let api_key = '185032d80f1827034396b9acfab5a79f';
let url = `http://ws.audioscrobbler.com/2.0?api_key=${api_key}&format=json`;

export function findArtists(term) {
    console.log(`last.fm search request for ${term}`);

    return requestGet(url + `&method=artist.search&artist=${term}`)
        .then(response => response.results.artistmatches.artist.map(mapItem))
        .then(artists => removeInvalidData(artists, 'artists'));
}

export function findAlbums(artistName) {
    console.log(`last.fm albums request for ${artistName}`);

    return requestGet((url + `&method=artist.getTopAlbums&artist=${artistName}`))
        .then(response => response.topalbums.album.map(mapItem))
        .then(albums => removeInvalidData(albums, 'albums'));
}

export function findTracks(artistName, albumName) {
    console.log(`last.fm albums request for ${artistName}`);

    return new Promise(function (resolve) {
        resolve([
            {name: `Dreamimg (${artistName})`, duration: 1091, id: 1},
            {name: `Inspire (${artistName})`, duration: 1331, id: 2},
            {name: `Whoka (${artistName})`, duration: 1291, id: 3},
            {name: `Gogo  (${artistName})`, duration: 1391, id: 4},
        ]);
    });
}

function mapItem(artist) {
    return {
        name: artist.name,
        id: artist.mbid,
        image: artist.image[2]['#text'] //large image, use filter, write unit tests
    };
}

function removeInvalidData(items, setName) {
    var itemsWithId = items.filter(a => a.id);

    if (itemsWithId.length < items.length) {
        console.log(`ignoring ${items.length - itemsWithId.length} ${setName} without id`);
    }

    var itemsWithImage = itemsWithId.filter(a => a.image);
    if (itemsWithImage.length < itemsWithId.length) {
        console.log(`ignoring ${itemsWithId.length - itemsWithImage.length} ${setName} without image`);
    }

    var duplicated = getDuplicated(itemsWithImage, 'id');
    if (duplicated) {
        console.log(`Found duplicated ${setName}\r\n` + duplicated);
        console.log('Taking the first artist by id');
        itemsWithImage = filterOutDuplicatedBy(itemsWithImage, 'id')
    }
    return itemsWithImage;
}

function getDuplicated(items, targetPropertyName) {
    return _
        .chain(items)
        .groupBy(item => item[targetPropertyName])
        .toPairs()
        .filter(pair => pair[1].length > 1)
        .map(pair => pair[0] + ' : [' + pair[1].map(i => i.name).join(', ') + ']')
        .join('\r\n')
        .value();
}

function filterOutDuplicatedBy(items, propertyName) {
    return _
        .chain(items)
        .groupBy(item => item[propertyName])
        .toPairs()
        .map(pair => pair[1][0])
        .value();
}

export function findArtistsMock(term) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve([
            {
                name: `Foo (${term})`,
                id: 1,
                image: 'https://lastfm-img2.akamaized.net/i/u/174s/e3b0f8abab8242d8a9f499736d59e726.png'
            },
            {
                name: `Bar (${term})`,
                id: 2,
                image: 'https://lastfm-img2.akamaized.net/i/u/174s/e3b0f8abab8242d8a9f499736d59e726.png'
            },
            {
                name: `Buz (${term})`,
                id: 3,
                image: 'https://lastfm-img2.akamaized.net/i/u/174s/e3b0f8abab8242d8a9f499736d59e726.png'
            },
        ]), 1000);
    });
}

export function findAlbumsMock(artistName) {
    return new Promise(function (resolve) {
        resolve([
            {
                name: `Album 1 (${artistName})`,
                id: 1,
                image: `https://lastfm-img2.akamaized.net/i/u/174s/e3b0f8abab8242d8a9f499736d59e726.png`
            },
            {
                name: `Album 2 (${artistName})`,
                id: 2,
                image: `https://lastfm-img2.akamaized.net/i/u/174s/e3b0f8abab8242d8a9f499736d59e726.png`
            },
            {
                name: `Album 3 (${artistName})`,
                id: 3,
                image: `https://lastfm-img2.akamaized.net/i/u/174s/e3b0f8abab8242d8a9f499736d59e726.png`
            },
            {
                name: `Album 4 (${artistName})`,
                id: 4,
                image: `https://lastfm-img2.akamaized.net/i/u/174s/e3b0f8abab8242d8a9f499736d59e726.png`
            }
        ]);
    });
}