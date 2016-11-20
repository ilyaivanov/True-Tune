import * as React from 'react';
import * as cx from 'classnames';

import Portlet from './Portlet';

export default class ArtistDetails extends React.Component<{ artist: Artist }, {}> {

    renderAlbum = album => (
        <div className="grid-item artist-info">
            <Portlet
                key={album.id}
                album={album} />
        </div>
    )

    render() {
        const {artist} = this.props;
        return (<div>
            <div className="artist-header">
                <div className="left-buttons">
                    <i className="fa fa-chevron-circle-left"/>
                </div>
                <div className="right-buttons">
                    <i className="fa fa-search"></i>
                    <i className="fa fa-chevron-circle-right"/>
                </div>
                <img src={artist.image} alt={artist.name} />
                <span className="artist-title">
                    {artist.name}
                </span>
            </div>
            <div className="sublime" />
            <div className="artist-albums-container grid-container">
                {artist.albums.map(this.renderAlbum)}
            </div>
        </div>);
    }
}

//<Link to="/"><i className="fa fa-search" aria-hidden="true" /></Link>