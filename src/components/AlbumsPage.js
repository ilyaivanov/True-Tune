import React from 'react';
import ItemPortlet from './ItemPortlet';
import {findAlbums, findInfo} from './../services/lastfm';
import {Link} from 'react-router';
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
        let {image, name} = this.state.info;
        return <article className="content-article">
            <div className="artist-header">
                <div className="left-buttons">
                    {/*<i className="fa fa-chevron-circle-left" aria-hidden="true"/>*/}
                </div>
                <div className="right-buttons">
                    <Link to="/"><i className="fa fa-search" aria-hidden="true"/></Link>
                </div>
                <img src={image} alt={name}/>
                <span className="artist-title">
                    {name}
                </span>
            </div>
            <div className="sublime"/>
            <div className="artist-albums-container grid-container">
                {this.state.albums.map(album => <ItemPortlet key={album.id}
                                                             item={album}
                                                             link={`/artist/${this.props.params.artistName}/${album.name}`}/>)}
            </div>
        </article>;
    }
}