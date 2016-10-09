import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import './portlet.scss';

export default class ItemPortlet extends React.Component {
    render() {
        let {item, link, onClick} = this.props;
        onClick = onClick || (() => {
            });
        let onPlaylistClick = e => {
            console.log('click');
            e.stopPropagation();
        };
        let onMouseLeave = () => this.dropdown.classList.add('hidden');

        let showPlaylists = e => {
            this.dropdown.classList.remove('hidden');
            e.stopPropagation();
            e.preventDefault();
        }
        let child = (
            <div>
                <div className="artist-image" onMouseLeave={onMouseLeave}>
                    <img src={item.image} alt="Foo"/>
                    <div className="shadow"/>
                    <div className="dropdown-content hidden" ref={e => this.dropdown = e}>
                        <button onClick={onPlaylistClick}>Link 1</button>
                        <br/>
                        <button onClick={onPlaylistClick}>Link 2</button>
                        <br/>
                        <button onClick={onPlaylistClick}>Link 3</button>
                    </div>
                    <div className="artist-options">
                        <i className="dropbtn fa fa-plus" onClick={showPlaylists} aria-hidden="true"/>
                    </div>
                </div>
                <div className="artist-title">{item.name}</div>
            </div>);
        if (link) {
            return (<Link className="grid-item artist-info" to={link} onClick={onClick}>
                {child}
            </Link>);
        }
        else {
            return (<div className="grid-item artist-info" onClick={onClick}>
                {child}
            </div>);
        }
    }
}

ItemPortlet.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    link: PropTypes.string
};
