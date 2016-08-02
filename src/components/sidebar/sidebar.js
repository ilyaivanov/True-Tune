import './style.css';
import React from 'react';

let Sidebar = function (props) {
    return (
        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                    <a href="#">
                        True Tune
                    </a>
                </li>
                <li>
                    <a href="#">Ambient</a>
                </li>
                <li>
                    <a href="#">Metal</a>
                </li>
                <li>
                    <a href="#">Meditation</a>
                </li>
                <li>
                    <a href="#">Working out</a>
                </li>
                <li>
                    <a href="#">Just working</a>
                </li>
            </ul>
        </div>);
};

export default Sidebar;