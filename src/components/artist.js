import React from 'react';
import {Collapse, Image} from 'react-bootstrap';
import Album from './album';
import PlaylistsModel from './../models/playlists';

let mapArtist = function (props) {
    let addTo = (event, playlist, item, type) => {
        item.type = type;
        event.stopPropagation();
        props.addTo(playlist, item);
    };

    let mapAlbum = function (album) {
        return (
            <Album key={album.id}
                   album={album}
                   toggleAlbum={props.toggleAlbum}
                   playlists={props.playlists}
                   addTo={props.addTo}
                   playTrack={props.playTrack}
            />
        );
    };

    var artist = props.artist;
    return (
        <div >
            <a href="JavaScript:;" onClick={props.toggleArtist.bind(this, artist)}
               className="list-group-item">
                    <span>
                        <Image src={artist.image}/>
                    </span>
                <span className="artist-title">{artist.name}
                    <div className="dropdown">
                          <button className="dropbtn glyphicon glyphicon-plus"></button>
                          <div className="dropdown-content">
                              {props.playlists.map((playlist, index) => <a href="#" key={index}
                                                                           onClick={event => addTo(event, playlist, artist, 'artist')}>{playlist.name}</a>)}
                          </div>
                    </div>
                    <div className="dropdown">
                          <button className="dropbtn glyphicon glyphicon-remove"
                                  onClick={e => PlaylistsModel.removeItemFromCurrentPlaylist(artist)}></button>

                    </div>
                </span>
            </a>
            <Collapse in={artist.areAlbumsShown}>
                <div className="list-group">
                    {artist.albums && artist.albums.map(mapAlbum)}
                </div>
            </Collapse>
        </div>
    )
};

export default mapArtist;
