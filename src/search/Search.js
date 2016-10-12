import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { startSearchingArtists, fetchArtistsFromServiceAsync } from './actions';
import debounce from 'lodash/debounce';
import { add } from './../favotires/actions';
import ArtistLink from './../components/ArtistLink';
export class Search extends React.Component {

    static propTypes = {
        searchForArtists: PropTypes.func.isRequired,
        addToFavorites: PropTypes.func.isRequired,
        artists: PropTypes.array.isRequired,
        isLoading: PropTypes.bool,
    };
    render() {
        let triggerSearchChangeDebounced = debounce((text) => {
            this.props.searchForArtists(text);
        }, 500);

        let { artists, isLoading } = this.props;
        let loading;
        if (isLoading)
            loading = <b>Loading...</b>;
        return (<div>
            <div className="search-area">
                <h2>Search for an artist</h2>
                <input autoFocus
                       type="text"
                       onChange={event => triggerSearchChangeDebounced(event.target.value)}/>
            </div>
            <br/>
            {loading}
            <ul>
                {artists.map(ar => <li key={ar.id}><ArtistLink artist={ar}>
                    <button onClick={() => this.props.addToFavorites(ar)}>add</button>
                </ArtistLink>
                </li>)}
            </ul>
        </div>);
    }
}

let mapStateToProps = (state) => ({
    artists: state.search.artists,
    isLoading: state.search.isLoading
});

function mapDispatchToProps(dispatch) {
    return {
        searchForArtists: term => {
            dispatch(startSearchingArtists());
            dispatch(fetchArtistsFromServiceAsync(term));
        },
        addToFavorites: artist => dispatch(add(artist))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
