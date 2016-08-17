import React from 'react';
import PlaylistsModel from './../models/playlists';
import Player from './../models/player';

let mapTrack = (props) => {
    var track = props.track,
        position = props.position;

    return <li className="list-group-item">{position}.
        <a href="JavaScript:;" onClick={Player.play.bind(Player, track.artistName, track.albumName, track)}>
            <span className="glyphicon glyphicon-play"></span>
        </a>
        {track.name}
        {(props.playlists) ? (
            <div className="dropdown">
                <button className="dropbtn glyphicon glyphicon-plus"></button>
                <div className="dropdown-content">
                    {props.playlists.map((playlist, index) => <a href="#" key={index}
                                                                 onClick={event => PlaylistsModel.addTo(event, playlist, track, 'track')}>{playlist.name}</a>)}
                </div>
            </div>) :
            (<div className="dropdown">
                <button className="dropbtn glyphicon glyphicon-remove"
                        onClick={e => PlaylistsModel.removeItemFromCurrentPlaylist(track)}></button>

            </div>)}
    </li>;
};

export default mapTrack;