import requestGet from './../utils/request';
import _ from 'lodash';

export function findArtistsMock(term) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve([
            {name: 'Foo ' + term},
            {name: 'Bar ' + term}
        ]), 1000);
    });
}

export function findArtists(term) {
    console.log(`last.fm request for ${term}`);
    var api_key = '185032d80f1827034396b9acfab5a79f';
    var url = `http://ws.audioscrobbler.com/2.0?api_key=${api_key}&format=json&method=artist.search&artist=${term}`;
    return requestGet(url)
        .then(response => response.results.artistmatches.artist.map(mapArtist))
        .then(artists => removeInvalidData(artists, 'artists'));
}

function mapArtist(artist){
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
