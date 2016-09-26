import React from 'react';
import ItemPortlet from './ItemPortlet';
import {findAlbums, findInfo} from './../services/lastfm';

export default class AlbumsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {albums: [], info: {}};
    }

    componentWillMount() {
        //TODO: error handling
        findAlbums(this.props.params.artistName).then(albums => this.setState({albums}));
        findInfo(this.props.params.artistName).then(info=> this.setState({info}));
    }

    render() {
        let {artist, albums, onAlbumSelect, params} = this.props;
        return <article className="content-article">
            <div className="artist-header">
                <div className="left-buttons">
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"/>
                </div>
                <div className="right-buttons">
                    <i className="fa fa-cog" aria-hidden="true"/>
                    <i className="fa fa-chevron-circle-right" aria-hidden="true"/>
                </div>
                <img src={this.state.info.image} alt={this.state.info.name}/>
                <span className="artist-title">
                    {params.artistName}
                </span>
            </div>
            <div className="sublime"/>
            <div className="artist-albums-container grid-container">
                {this.state.albums.map(album => <ItemPortlet key={album.id} item={album} link={'some link'}/>)}
            </div>
        </article>;
    }
}