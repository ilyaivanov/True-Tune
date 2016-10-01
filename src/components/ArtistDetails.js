import React, {PropTypes} from 'react';
import Portlet from './ItemPortlet';
import {Link} from 'react-router';

export default function ArtistDetails(props) {
    let {albums, name, artist, onAlbumSelect} = props;
    let albumsRendered;
    artist = artist || {};
    if (props.albums) {
        albumsRendered = (<div className="artist-albums-container grid-container">
            {albums.map(album => <Portlet key={album.id}
                                          onClick={() => onAlbumSelect(name, album.name)}
                                          item={album}/>)}
        </div>);
    }

    return (<div>
        <div className="artist-header">
            <div className="left-buttons">
                {/*<i className="fa fa-chevron-circle-left" aria-hidden="true"/>*/}
            </div>
            <div className="right-buttons">
                <Link to="/"><i className="fa fa-search" aria-hidden="true"/></Link>
            </div>
            <img src={artist.image} alt={name}/>
            <span className="artist-title">
                {name}
            </span>
        </div>
        <div className="sublime"/>
        {albumsRendered}
    </div>);
}

ArtistDetails.propTypes = {
    albums: PropTypes.array.isRequired,
    artist: PropTypes.object,
    onAlbumSelect: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};