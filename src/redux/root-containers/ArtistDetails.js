import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {searchForAlbums} from '../actions/fuelSavingsActions';
import ArtistsDetailsComponent from './../../components/ArtistDetails';

class ArtistDetails extends React.Component {

    componentWillMount() {
        this.props.findAlbums(this.props.params.artistName);
        this.props.findArtist(this.props.params.artistName);
    }

    render() {
        return (<ArtistsDetailsComponent albums={this.props.albums}
                                         name={this.props.params.artistName}/>);
    }
}


ArtistDetails.propTypes = {
    albums: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    findAlbums: PropTypes.func.isRequired,
    findArtist: PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        albums: state.app.albums
    };
}

function mapDispatchToProps(dispatch) {
    return {
        findAlbums: text => dispatch(searchForAlbums(text)),
        findArtist: () => {
        } //dispatch(searchForAlbums(text))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistDetails);