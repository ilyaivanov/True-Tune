import React, { PropTypes as T } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { startSearchingAlbums, fetchArtistInfoFromServiceAsync, fetchAlbumsFromServiceAsync } from './actions';

class ArtistDetails extends React.Component {
    static propTypes = {
        params: T.object.isRequired,
        artist: T.object,
        albums: T.array,
        loadAlbums: T.func.isRequired
    };

    componentWillMount() {
        this.props.loadAlbums(this.props.params.artistName);
        this.props.loadArtistInfo(this.props.params.artistName);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.params.artistName != newProps.params.artistName) {
            newProps.loadArtistInfo(newProps.params.artistName);
            newProps.loadAlbums(newProps.params.artistName);
        }
    }

    render() {
        let { params, albums, artist } = this.props;
        albums = albums || [];
        let info;
        if(artist){
            info = <img src={artist.image} alt=""/>
        }
        return (<div>
            <span><Link to="/">search</Link></span>
            <h1>{params.artistName}</h1>
            {info}
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
        artist: state.artistDetails.artist,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        loadAlbums: (artistName) => {
            dispatch(startSearchingAlbums());
            dispatch(fetchAlbumsFromServiceAsync(artistName));
        },
        loadArtistInfo:(artistName) => {
            dispatch(fetchArtistInfoFromServiceAsync(artistName));
        }
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistDetails);
