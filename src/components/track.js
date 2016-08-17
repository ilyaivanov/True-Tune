import React from 'react';

let mapTrack = (props) => {
    var album = props.album,
        track = props.track,
        index = props.index,
        playTrack = props.playTrack;

    return <li className="list-group-item">{index + 1}.
        <a href="JavaScript:;" onClick={() => playTrack(album.artistName, album, track)}><span
            className="glyphicon glyphicon-play"></span></a>
        {track.name}
        <div className="dropdown">
            <button className="dropbtn glyphicon glyphicon-plus"></button>
            <div className="dropdown-content">
                <a href="#">one</a>
                <a href="#">two</a>
            </div>
        </div>
    </li>;
};

export default mapTrack;