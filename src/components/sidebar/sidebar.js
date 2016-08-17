import React from 'react';
import './sidebar.css'
import PlaylistsModel from './../../models/playlists';

let Sidebar = props => {
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