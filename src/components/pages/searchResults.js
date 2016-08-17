import React from 'react';
import './searchResults.css'
import Artist from '../artist';

let SearchResults = function (props) {

    var artists = props.artists;
    return (
        <div>
            <div className="list-group list-group-root well">
                {artists.map(artist => <Artist key={artist.id}
                                               playlists={props.playlists}
                                               artist={artist}
                                               addTo={props.addTo}
                                               toggleArtist={props.toggleArtist}
                                               toggleAlbum={props.toggleAlbum}/>)}
            </div>

        </div>
    );

};

export default SearchResults;