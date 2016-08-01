import React from 'react';

let albumsMapper = album => <li key={album.url}>{album.name}</li>;
let showAlbums = albums => albums.map(albumsMapper);



let ArtistsList = function (props) {
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