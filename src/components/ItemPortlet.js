import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default function ItemPortlet({item, link}) {
    return (
        <Link className="grid-item artist-info" to={link}>
            <div className="artist-image">
                <img src={item.image} alt="Foo"/>
                <div className="shadow"/>
                <div className="artist-options">
                    <i className="fa fa-heart-o" aria-hidden="true"/>
                    <i className="fa fa-ellipsis-h" aria-hidden="true"/>
                </div>
            </div>
            <div className="artist-title">{item.name}</div>
        </Link>);
}

ItemPortlet.propTypes = {
    item: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired
};
