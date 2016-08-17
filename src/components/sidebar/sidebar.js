import React from 'react';
import classnames from 'classnames';
import './sidebar.css'
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

let Sidebar1 = props => {
    return (<div className="navbar-default sidebar" role="navigation">
        <div className="sidebar-nav navbar-collapse">
            <ul className="nav" id="side-menu">
                <li className="sidebar-search">
                    <div className="input-group custom-search-form">
                        <input type="text" className="form-control" placeholder="Search..."/>
                        <span className="input-group-btn">

                                <button className="btn btn-default" type="button"
                                        onClick={e => PlaylistsModel.selectPlaylist(undefined)}>
                                <span className="glyphicon glyphicon-search"></span>
                                </button>
                            </span>
                    </div>
                </li>
                <li>
                    <a href="JavaScript:;" onClick={PlaylistsModel.createPlaylist}><i
                        className="glyphicon glyphicon-plus"></i>
                        Create playlist</a>
                </li>
                {props.playlists.map((p, i) =>
                    (<li key={i}>
                        {
                            (p.isEditing) ?
                                (<input type="text"
                                        value={p.name}
                                        onChange={event => PlaylistsModel.setPlaylistName(event, p)}
                                        onBlur={() => PlaylistsModel.stopEditingPlaylist(p)}/>) :
                                (
                                    <a href="JavaScript:;" onClick={()=>PlaylistsModel.selectPlaylist(p)}><i
                                        className="glyphicon glyphicon-list-alt"></i> {p.name}
                                    </a>
                                )
                        }
                        {!p.isEditing && (<button className="edit glyphicon glyphicon-edit"
                                                  onClick={() => PlaylistsModel.editPlaylist(p)}></button>)}

                    </li>))}
            </ul>
        </div>
    </div>);
};


export default Sidebar;