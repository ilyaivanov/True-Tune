import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { startSearchingArtists, fetchArtistsFromServiceAsync } from './actions';
import debounce from 'lodash/debounce';
import { add } from './../favotires/actions';
class Search extends React.Component {
    render() {
        console.log(this.props)
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
                {artists.map(ar => <li key={ar.id}><a href={ar.name}>{ar.name}</a>{' '}
                    <button onClick={() => this.props.addToFavorites(ar)}>add</button>
                </li>)}
            </ul>
        </div>);
    }
}

Search.propTypes = {
    searchForArtists: PropTypes.func.isRequired,
};

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
