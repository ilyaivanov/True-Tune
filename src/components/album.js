import React from 'react';
import {Collapse, Image} from 'react-bootstrap';

let mapTrack = (album, track, index, playTrack) => <li key={track.id} className="list-group-item">{index + 1}.
    <a href="JavaScript:;" onClick={() => playTrack(album.artistName, album, track)}><span
        className="glyphicon glyphicon-play"></span></a> {track.name}
</li>;


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
                          <button className="dropbtn">add</button>
                          <div className="dropdown-content">
                              {props.playlists.map((p, i) => <a href="#" key={i} onClick={e => addTo(e, p, props.album, 'album')}>{p.name}</a>)}
                          </div>
                        </div>
                    </span>
            </a>
            <Collapse in={props.album.areTracksShown}>
                <ol className="list-group">
                    {props.album.tracks && props.album.tracks.map((track, index) => mapTrack(props.album, track, index, props.playTrack))}
                </ol>
            </Collapse>
        </div>);
};

export default mapAlbum;
