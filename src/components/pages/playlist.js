import React from 'react';
import Album from './../album';
import Track from './../track';

let Playlist = (props) => {
    let mapAlbum = album => (<Album key={album.id}
                                    album={album}
                                    toggleAlbum={props.toggleAlbum}
                                    playlists={props.playlists}
                                    addTo={props.addTo}
                                    playTrack={props.playTrack}
    />);

    let mapTrack = (album, track) => (<Track key={track.id}
                                             playlists={props.playlists}
                                             album={album}
                                             track={track}
                                             position={0}
                                             addTrack={props.addTo}
                                             playTrack={props.playTrack}/>);

    return (<div>
        {props.playlist.items.map(item => item.type == 'album' ? mapAlbum(item) : mapTrack({name: 'some album'}, item))}
    </div>);
}

export default Playlist;