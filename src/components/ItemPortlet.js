import React from 'react';

export default ({item, onItemClick}) => (
    <div className="grid-item artist-info" onClick={() => onItemClick(item)}>
        <div className="artist-image">
            <img src={item.image} alt="Foo"/>
            <div className="shadow"/>
            <div className="artist-options">
                <i className="fa fa-heart-o" aria-hidden="true"/>
                <i className="fa fa-ellipsis-h" aria-hidden="true"/>
            </div>
        </div>
        <div className="artist-title">{item.name}</div>
    </div>);