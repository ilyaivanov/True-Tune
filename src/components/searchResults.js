import React from 'react';
import './searchResults.css'
import {Collapse, Button, Well} from 'react-bootstrap';
let SearchResults = function (props) {

    let mapTrack = (artist, album, track, index) => <li key={track.id} className="list-group-item">{index + 1}.
        <a href="JavaScript:;" onClick={() => props.playTrack(artist, album, track)}><span
            className="glyphicon glyphicon-play"></span></a> {track.name}
    </li>;

    let mapAlbum = function (artist, album) {
        return (
            <div key={album.id}>
                <a href="JavaScript:;" onClick={props.toggleAlbum.bind(this, artist, album)}
                   className="list-group-item">
                <span>
                    <img src={album.image}
                         alt=""/>
                </span>
                    <span className="artist-title">{album.name}</span>
                </a>
                <Collapse in={album.areTracksShown}>
                    <ol className="list-group">
                        {album.tracks && album.tracks.map((track, index) => mapTrack(artist, album, track, index))}
                    </ol>
                </Collapse>
            </div>);
    };

    let mapArtist = function (artist) {
        return (
            <div key={artist.id}>
                <a href="JavaScript:;" onClick={props.toggleArtist.bind(this, artist)}
                   className="list-group-item">
                    <span>
                        <img src={artist.image}
                             alt=""/>
                    </span>
                    <span className="artist-title">{artist.name}</span>
                </a>
                <Collapse in={artist.areAlbumsShown}>
                    <div className="list-group">
                        {artist.albums && artist.albums.map(album => mapAlbum(artist, album))}
                    </div>
                </Collapse>
            </div>
        )
    };

    var artists = props.artists;
    return (
        <div>
            <div className="list-group list-group-root well">
                {artists.map(mapArtist)}
            </div>

        </div>
    );

};

export default SearchResults;