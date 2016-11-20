import * as React from 'react';
// import {Link} from 'react-router';

export default function ItemPortlet(props: {item: Item}) {
    let child = (
        <div>
            <div className="artist-image">
                <img src={props.item.image} alt="Foo" />
                <div className="shadow" />
                <div className="artist-options">
                    <i className="fa fa-heart-o" aria-hidden="true" />
                    <i className="fa fa-ellipsis-h" aria-hidden="true" />
                </div>
            </div>
            <div className="artist-title">{props.item.name}</div>
        </div>);

    return child;
}
