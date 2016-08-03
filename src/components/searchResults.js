import React from 'react';
import './searchResults.css'
import {Collapse, Button, Well} from 'react-bootstrap';
let SearchResults = function (props) {

    let mapTrack = t => <a href="JavaScript:;" key={t.id} className="list-group-item">{t.name}</a>;

    let mapAlbum = function (artist, album) {
        return (
            <div key={album.id}>
                <a href="JavaScript:;" onClick={props.toggleAlbum.bind(this, artist, album)} className="list-group-item">
                <span>
                    <img src={album.image}
                         alt=""/>
                </span>
                    <span className="artist-title">{album.name}</span>
                </a>
                <Collapse in={album.areTracksShown}>
                    <div className="list-group">
                        {album.tracks && album.tracks.map(mapTrack)}
                    </div>
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
                    <div>
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