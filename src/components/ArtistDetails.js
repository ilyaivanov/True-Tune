import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Portlet from './ItemPortlet';
import {searchForAlbums} from './../actions/fuelSavingsActions';

export class ArtistDetails extends React.Component {

    componentWillMount() {
        this.props.findAlbums(this.props.params.artistName);
    }

    render() {
        let name = this.props.params.artistName;
        return (
            <div>
                <div className="artist-header">
                    <div className="left-buttons">
                        {/*<i className="fa fa-chevron-circle-left" aria-hidden="true"/>*/}
                    </div>
                    <div className="right-buttons">
                        <Link to="/"><i className="fa fa-search" aria-hidden="true"/></Link>
                    </div>
                    {/*<img src={image} alt={name}/>*/}
                    <span className="artist-title">
                    {name}
                </span>
                </div>

                <div className="sublime"/>
                <div className="artist-albums-container grid-container">
                    {this.props.albums.map(album => <Portlet key={album.id}
                                                             item={album}
                                                             link={`/artist/${this.props.params.artistName}/${album.name}`}/>)}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        albums: state.app.albums
    };
}

function mapDispatchToProps(dispatch) {
    return {
        findAlbums: text => dispatch(searchForAlbums(text))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistDetails);