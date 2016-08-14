import React from 'react';
import './searchResults.css'
import Album from './album';
import {Collapse, Image} from 'react-bootstrap';

let SearchResults = function (props) {

    let mapAlbum = function (artist, album) {
        return (
            <Album key={album.id}
                   artist={artist}
                   album={album}
                   toggleAlbum={props.toggleAlbum}
                   playlists={props.playlists}
                   addTo={props.addTo}
                   playTrack={props.playTrack}
            />
        );
    };

    let mapArtist = function (artist) {
        return (
            <div key={artist.id}>
                <a href="JavaScript:;" onClick={props.toggleArtist.bind(this, artist)}
                   className="list-group-item">
                    <span>
                        <Image src={artist.image}/>
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