import * as React from 'react';
// import {Link} from 'react-router';

export default function ItemPortlet(props: {album: Album}) {
    let child = (
        <div>
            <div className="artist-image">
                <img src={props.album.image} alt="Foo" />
                <div className="shadow" />
                <div className="artist-options">
                    <i className="fa fa-heart-o" aria-hidden="true" />
                    <i className="fa fa-ellipsis-h" aria-hidden="true" />
                </div>
            </div>
            <div className="artist-title">{props.album.name}</div>
        </div>);

    return child;
}
