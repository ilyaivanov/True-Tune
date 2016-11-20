function createArtist(name: string, id: string): Artist {
    return {
        id,
        name,
        image: "https://lastfm-img2.akamaized.net/i/u/174s/58fc3b5aa7c74541adf85674e272f7fc.png",
        albums: [
            createAlbum('Album 1', '1'),
            createAlbum('Album 2', '2'),
            createAlbum('Album 3', '3'),
            createAlbum('Album 4', '4'),
            createAlbum('Album 5', '5'),
            createAlbum('Album 6', '6'),
            createAlbum('Album 7', '7'),
        ]
    };
}

function createAlbum(name: string, id: string): Album {
    return {
        name,
        id,
        image: "https://lastfm-img2.akamaized.net/i/u/174s/31635b1dc28540c3a93bb6b0f19e42fb.png",
        tracks: [
            createTrack('Intro', '1'),
            createTrack('Robeast', '2'),
            createTrack('Fracture', '3', true),
            createTrack('Thrasher', '4'),
        ]
    };
}

function createTrack(name: string, id: string, isActive?: boolean): Track {
    return {
        name,
        id,
        duration: 1234,
        isActive: isActive ? isActive : false,
    };
}

const albums: Album[] = [
    createAlbum('My Album', "1")
];

const artist: Artist = createArtist('Pain', "1");
const artists: Artist[] = [
    createArtist('Pain', "1"),
    createArtist('Pain', "2"),
    createArtist('Pain', "3"),
    createArtist('Pain', "4"),
    createArtist('Pain', "5"),
    createArtist('Pain', "6"),
    createArtist('Pain', "7"),
    createArtist('Pain', "8"),
];

export { albums, artist, artists };