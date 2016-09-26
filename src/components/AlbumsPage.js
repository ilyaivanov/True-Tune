import React from 'react';
import ItemPortlet from './ItemPortlet';

export default function AlbumsPage({artist, albums, onAlbumSelect}) {
    return <article className="content-article">
        <div className="artist-header">
            <div className="left-buttons">
                <i className="fa fa-chevron-circle-left" aria-hidden="true"/>
            </div>
            <div className="right-buttons">
                <i className="fa fa-cog" aria-hidden="true"/>
                <i className="fa fa-chevron-circle-right" aria-hidden="true"/>
            </div>
            <img src={artist.image} alt={artist.name}/>
            <span className="artist-title">
            {artist.name}
          </span>
        </div>
        <div className="sublime"/>
        <div className="artist-albums-container grid-container">
            {albums.map(album => <ItemPortlet key={album.id} item={album} onItemClick={onAlbumSelect} />)}
        </div>
    </article>;
}