import React from 'react';

let mapTrack = (props) => {
    var album = props.album,
        track = props.track,
        position = props.position,
        playTrack = props.playTrack;

    return <li className="list-group-item">{position}.
        <a href="JavaScript:;" onClick={() => playTrack(track.artistName, track.albumName, track)}>
            <span className="glyphicon glyphicon-play"></span>
        </a>
        {track.name}
        <div className="dropdown">
            <button className="dropbtn glyphicon glyphicon-plus"></button>
            <div className="dropdown-content">
                {props.playlists.map((playlist, index) => <a href="#" key={index}
                                                             onClick={event => props.addTrack(event, playlist, track, 'track')}>{playlist.name}</a>)}
            </div>
        </div>
    </li>;
};

export default mapTrack;