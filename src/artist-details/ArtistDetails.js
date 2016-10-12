import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { startSearchingAlbums, fetchAlbumsFromServiceAsync } from './actions';

class ArtistDetails extends React.Component {
    static propTypes = {
        params: T.object.isRequired,
        albums: T.array,
        loadAlbums: T.func.isRequired
    };

    componentWillMount() {
        if (!this.props.albums) {
            this.props.loadAlbums(this.props.params.artistName);
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.params.artistName != newProps.params.artistName) {
            newProps.loadAlbums(newProps.params.artistName);
        }
    }

    render() {
        let { params, albums } = this.props;
        albums = albums || [];
        return (<div>
            <span><Link to="/">search</Link></span>
            <h1>{params.artistName}</h1>
            <ul>
                {albums.map(album => <li key={album.id}>{album.name}</li>)}
            </ul>
        </div>);
    }
}


let mapStateToProps = state => {
    return {
        albums: state.artistDetails.albums,
        isLoading: state.artistDetails.isLoading,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadAlbums: (artistName) => {
            dispatch(startSearchingAlbums());
            dispatch(fetchAlbumsFromServiceAsync(artistName));
        }
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistDetails);
