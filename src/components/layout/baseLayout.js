import React from 'react';
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './baseLayout.css'
import App from './../app'

class BaseLayout extends React.Component {
    render() {
        var styles = {'marginBottom': 0};

        return (<div id="wrapper">
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={styles}>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse"
                            data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="JavaScript:;">True Tune</a>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="glyphicon glyphicon-play"></i>
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="glyphicon glyphicon-pause"></i>
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="glyphicon glyphicon-stop"></i>
                        </a>
                    </li>
                </ul>
                <div className="navbar-default sidebar" role="navigation">
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
                </div>
            </nav>
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="page-header">Find artists</h2>
                        <App/>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default BaseLayout;