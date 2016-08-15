import React from 'react';
import './sidebar.css'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.editPlaylist = props.editPlaylist;
        this.createPlaylist = props.createPlaylist;
        this.setPlaylistName = (event, playlist) => props.setPlaylistName(playlist, event.target.value);
        this.stopEditingPlaylist = props.stopEditingPlaylist;
        this.selectPlaylist = props.selectPlaylist;
        this.playlists = props.playlists;

    }

    componentDidUpdate() {
        //set focus on edited playlist
    }

    render() {
        return (<div className="navbar-default sidebar" role="navigation">
            <div className="sidebar-nav navbar-collapse">
                <ul className="nav" id="side-menu">
                    <li className="sidebar-search">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Search..."/>
                            <span className="input-group-btn">

                                <button className="btn btn-default" type="button">
                                <span className="glyphicon glyphicon-search"></span>
                                </button>
                            </span>
                        </div>
                    </li>
                    <li>
                        <a href="JavaScript:;" onClick={this.createPlaylist}><i
                            className="glyphicon glyphicon-plus"></i>
                            Create playlist</a>
                    </li>
                    {this.playlists.map((p, i) =>
                        (<li key={i}>
                            {
                                (p.isEditing) ?
                                    (<input type="text"
                                            value={p.name}
                                            onChange={event => this.setPlaylistName(event, p)}
                                            onBlur={() => this.stopEditingPlaylist(p)}/>) :
                                    (
                                        <a href="JavaScript:;" onClick={()=>this.selectPlaylist(p)}><i
                                            className="glyphicon glyphicon-list-alt"></i> {p.name}
                                        </a>
                                    )
                            }
                            {!p.isEditing && (<button className="edit glyphicon glyphicon-edit"
                                                      onClick={() => this.editPlaylist(p)}></button>)}

                        </li>))}
                </ul>
            </div>
        </div>);
    }
}


export default Sidebar;