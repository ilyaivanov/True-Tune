import React from 'react'

let sidebar = props => (<div className="navbar-default sidebar" role="navigation">
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
                <a href="JavaScript:;"><i className="glyphicon glyphicon-dashboard"></i> Dashboard</a>
            </li>
            <li>
                <a href="JavaScript:;"><i className="glyphicon glyphicon-blackboard"></i> Tables</a>
            </li>
            <li>
                <a href="JavaScript:;"><i className="glyphicon glyphicon-edit"></i> Forms</a>
            </li>
        </ul>
    </div>
</div>);

export default sidebar;