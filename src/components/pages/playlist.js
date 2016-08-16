import React from 'react';
import Album from './../album';



let Playlist = (props) =>{
    let mapAlbum = album => (<Album key={album.id}
                                    album={album}
                                    artist={props.artist}
                                    toggleAlbum={props.toggleAlbum}
                                    playlists={props.playlists}
                                    addTo={props.addTo}
                                    playTrack={props.playTrack}
    />);

    return (<div>
        {props.playlist.items.map(mapAlbum)}
    </div>);
}

export default Playlist;