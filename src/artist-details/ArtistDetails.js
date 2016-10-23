import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import ArtistLink from './../components/ArtistLink';
import {startSearchingAlbums,
    startSearchingAlbum,
    fetchArtistInfoFromServiceAsync,
    fetchAlbumsFromServiceAsync,
    fetchAlbumInfoFromServiceAsync,} from './actions';

export class ArtistDetails extends React.Component {
    static propTypes = {
        params: T.object.isRequired,
        artist: T.object,
        albums: T.array,
        loadAlbums: T.func.isRequired,
        loadArtistInfo: T.func.isRequired,
    };

    componentWillMount() {
        let props = this.props;
        let params = props.params;
        props.loadAlbums(params.artistName);
        props.loadArtistInfo(params.artistName);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.params.artistName != newProps.params.artistName) {
            newProps.loadArtistInfo(newProps.params.artistName);
            newProps.loadAlbums(newProps.params.artistName);
        }
    }

    render() {
        let {params, albums, artist} = this.props;
        albums = albums || [];
        artist = artist || {tags:[], similar:[]};
        let info;
        if (artist) {
            info = <img src={artist.image} style={{maxWidth: 200}}/>
        }
        let selectAlbum = albumName => () => this.props.selectAlbum(params.artistName, albumName);
        return (<div>
            <h1>{params.artistName}</h1>
            {info}
            <ul>
                {albums.map(album => <li key={album.id}><a href="JavaScript:;"
                                                           onClick={selectAlbum(album.name)}>{album.name}</a></li>)}
            </ul>

            <h3>Similar to {params.artistName}:</h3>
            <ul>
                {artist.similar.map(ar => <li key={ar.id}><ArtistLink artist={ar}/></li>)}
            </ul>
            <h3>Tags:</h3>
            {artist.tags.join(', ')}
        </div>);
    }
}


let mapStateToProps = state => {
    return {
        albums: state.artistDetails.albums,
        isLoading: state.artistDetails.isLoading,
        artist: state.artistDetails.artist
    };
};

export function mapDispatchToProps(dispatch) {
    return {
        loadAlbums: (artistName) => {
            dispatch(startSearchingAlbums());
            dispatch(fetchAlbumsFromServiceAsync(artistName));
        },
        loadArtistInfo: (artistName) => {
            dispatch(fetchArtistInfoFromServiceAsync(artistName));
        },
        selectAlbum: (artistName, albumName) => {
            dispatch(startSearchingAlbum());
            dispatch(fetchAlbumInfoFromServiceAsync(artistName, albumName));
        }
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistDetails);
