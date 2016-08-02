import React from 'react';

let ArtistsList = function (props) {
    let tracksMapper = track => <li id={track.mbid}>{track.name}</li>;

    let showTracks = tracks => tracks.map(tracksMapper);

    let albumsMapper = album => <li key={album.url}>
        <a href="JavaScript:;" onClick={props.toggleTracks.bind(this, album)}>
            {album.name}
            <ul>{album.isTracksVisible && showTracks(album.tracks)}</ul>
        </a>
    </li>;

    let showAlbums = albums => albums.map(albumsMapper);

    let mapper = function (a) {
        return (<li key={a.id}>
            <a href="JavaScript:;" onClick={props.toggleAlbum.bind(this, a)}>{a.text}</a>
            <ul>{a.isAlbumsVisible && showAlbums(a.albums)}</ul>
        </li>);
    }

    return (<ul>
        {props.artists.map(mapper)}
    </ul>)
};

export default ArtistsList;