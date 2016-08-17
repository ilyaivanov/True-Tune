import React from 'react';
import {Collapse, Image} from 'react-bootstrap';
import Album from './album';
import PlaylistsModel from './../models/playlists';
import Artists from './../models/artists';

let mapArtist = props =>
    (<div>
        <a href="JavaScript:;" onClick={Artists.findAlbums.bind(Artists, props.artist)}
           className="list-group-item">
                <span>
                    <Image src={props.artist.image}/>
                </span>
            <span className="artist-title">{props.artist.name}
                {(props.playlists) ? (<div className="dropdown">
                    <button className="dropbtn glyphicon glyphicon-plus"></button>
                    <div className="dropdown-content">
                        {props.playlists.map((playlist, index) => <a href="#" key={index}
                                                                     onClick={event => PlaylistsModel.addTo(event, playlist, props.artist, 'artist')}>{playlist.name}</a>)}
                    </div>
                </div>) :
                    (<div className="dropdown">
                        <button className="dropbtn glyphicon glyphicon-remove"
                                onClick={e => PlaylistsModel.removeItemFromCurrentPlaylist(props.artist)}></button>
                    </div>)}
            </span>
        </a>
        <Collapse in={props.artist.areAlbumsShown}>
            <div className="list-group">
                {props.artist.albums && props.artist.albums.map(album =>
                    <Album key={album.id}
                           album={album}
                           playlists={props.playlists}
                           playTrack={props.playTrack}
                    />)
                }
            </div>
        </Collapse>
    </div>);

export default mapArtist;
