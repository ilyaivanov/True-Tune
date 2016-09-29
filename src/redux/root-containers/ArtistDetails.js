import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {searchForAlbums, searchForArtistInfo, selectAlbum} from '../reducers';
import ArtistsDetailsComponent from './../../components/ArtistDetails';

class ArtistDetails extends React.Component {

    componentWillMount() {
        this.props.findAlbums(this.props.params.artistName);
        if (!this.props.artist) {
            this.props.findArtist(this.props.params.artistName);
        }
    }

    render() {
        return (<ArtistsDetailsComponent albums={this.props.albums}
                                         onAlbumSelect={this.props.selectAlbum}
                                         artist={this.props.artist}
                                         name={this.props.params.artistName}/>);
    }
}


ArtistDetails.propTypes = {
    albums: PropTypes.array.isRequired,
    artist: PropTypes.object,
    params: PropTypes.object.isRequired,
    findAlbums: PropTypes.func.isRequired,
    findArtist: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        albums: state.app.albums,
        artist: state.app.currentArtist,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        findAlbums: text => dispatch(searchForAlbums(text)),
        findArtist: text => dispatch(searchForArtistInfo(text)),
        selectAlbum: (arName, alName) => dispatch(selectAlbum(arName, alName))

    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistDetails);