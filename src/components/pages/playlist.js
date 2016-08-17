import React from 'react';
import Album from './../album';
import Artist from './../artist';
import Track from './../track';

let Playlist = (props) => {
    let mapArtist = artist => <Artist key={artist.id}
                                      artist={artist}/>;

    let mapAlbum = album => (<Album key={album.id}
                                    album={album}/>);

    let mapTrack = track => (<Track key={track.id}
                                    track={track}
                                    position={0}/>);

    let getMapFunction = type => type == 'artist' ? mapArtist : type == 'album' ? mapAlbum : mapTrack;

    return (<div>{props.playlist.items.map(item =>getMapFunction(item.type)(item))} </div>);
};

export default Playlist;