import React from 'react';
import classnames from 'classnames';
import PlaylistsModel from './../../models/playlists';

let playlistItem = (playlist, index) => {
    return (<a href="#"
               key={index}
               className={classnames('list-group-item', {'active': playlist.isActive})}
               onClick={()=>PlaylistsModel.selectPlaylist(playlist)}>{playlist.name}
        <p className="pull-right playlist-btn">
            <button type="button" className="btn btn-default btn-xs glyphicon glyphicon-edit"
                    onClick={(event) => PlaylistsModel.editPlaylist(playlist, event)}></button>
            <button type="button" className="btn btn-default btn-xs btn-danger glyphicon glyphicon-remove"></button>
        </p>
    </a>);
};

let playlistItemOnEdit = (playlist, index) => (<div className="list-group-item" key={index}>
    <input type="text"
           className="form-control"
           value={playlist.name}
           onChange={event => PlaylistsModel.setPlaylistName(playlist, event.target.value)}
           onBlur={() => PlaylistsModel.stopEditingPlaylist(playlist)}/>
</div>);

let Sidebar = props => (
    <div className="panel panel-default">
        <div className="panel-heading">Playlists
            <p className="pull-right">
                <button type="button"
                        className="btn btn-primary btn-xs glyphicon glyphicon-plus"
                        onClick={PlaylistsModel.createPlaylist}></button>
            </p>
        </div>
        <div className="list-group">
            {props.playlists.map((p, i) => p.isEditing ? playlistItemOnEdit(p, i) : playlistItem(p, i))}
        </div>
    </div>
);

export default Sidebar;