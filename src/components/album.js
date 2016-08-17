import React from 'react';
import {Collapse, Image} from 'react-bootstrap';
import Track from './track';


let mapAlbum = function (props) {
    let addTo = (event, playlist, item, type) => {
        item.type = type;
        event.stopPropagation();
        props.addTo(playlist, item);
    };

    return (
        <div>
            <a href="JavaScript:;" onClick={props.toggleAlbum.bind(this, props.album)}
               className="list-group-item">
                <span>
                    <Image src={props.album.image} circle/>
                </span>
                <span className="artist-title">{props.album.name}
                    <div className="dropdown">
                          <button className="dropbtn glyphicon glyphicon-plus"></button>
                          <div className="dropdown-content">
                              {props.playlists.map((playlist, index) => <a href="#" key={index}
                                                                onClick={event => addTo(event, playlist, props.album, 'album')}>{playlist.name}</a>)}
                          </div>
                    </div>
                </span>
            </a>
            <Collapse in={props.album.areTracksShown}>
                <ol className="list-group">
                    {props.album.tracks && props.album.tracks.map((track, index) => <Track
                        key={track.id}
                        playlists = {props.playlists}
                        album={props.album}
                        track={track}
                        position={index + 1}
                        addTrack = {addTo}
                        playTrack={props.playTrack}/>)}
                </ol>
            </Collapse>
        </div>);
};

export default mapAlbum;
