import React from 'react';


let sidebar = (props) => (<div className="navbar-default sidebar" role="navigation">
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
                <a href="JavaScript:;" onClick={props.createPlaylist}><i className="glyphicon glyphicon-plus"></i> Create playlist</a>
            </li>
            {props.playlists.map((p, i) =>
                (<li key={i}>
                    <a href="JavaScript:;"><i className="glyphicon glyphicon-list-alt"></i> {p.name}</a>
                </li>))}
        </ul>
    </div>
</div>);

export default sidebar;