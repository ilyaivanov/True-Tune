import React from 'react';
import Album from './../album';
import Artist from './../artist';
import Track from './../track';

let Playlist = (props) => {
    let mapArtist = artist => <Artist key={artist.id}
                                      playlists={props.playlists}
                                      artist={artist}
                                      addTo={props.addTo}
                                      toggleArtist={props.toggleArtist}
                                      toggleAlbum={props.toggleAlbum}
                                      playTrack={props.playTrack}/>;

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
        {props.playlist.items.map(item => item.type == 'album' ? mapAlbum(item) :
                                          item.type == 'artist' ? mapArtist(item) :
                                          mapTrack({name: 'some album'}, item))}
    </div>);
}

export default Playlist;