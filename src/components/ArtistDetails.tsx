import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router'
import Portlet from './Portlet';

export default class ArtistDetails extends React.Component<{ artist: Artist }, {}> {
    render() {
        const {artist, children} = this.props;
        return (<div>
            <div className="artist-header">
                <div className="left-buttons">
                    <i className="fa fa-chevron-circle-left" />
                </div>
                <div className="right-buttons">
                    <Link to={`/search`}><i className="fa fa-search"></i></Link>
                    <i className="fa fa-chevron-circle-right" />
                </div>
                <img src={artist.image} alt={artist.name} />
                <span className="artist-title">
                    {artist.name}
                </span>
            </div>
            <div className="sublime">
                <Link to={`/artist/albums`}>albums</Link>
                <Link to={`/artist/similar`}>similar</Link>
            </div>
                {children}
            
        </div>);
    }
}

//<Link to="/"><i className="fa fa-search" aria-hidden="true" /></Link>