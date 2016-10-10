import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import SearchPageComponent from '../SearchPage';
import * as actions from './../../state/reducers/actions';

let SearchPage = props => <SearchPageComponent onSearch={props.setSearchText}
                                               onArtistSelect={props.onArtistSelect}
                                               addToFavorites={props.addToFavorites}
                                               artists={props.artists || []}/>;

SearchPage.propTypes = {
    artists: PropTypes.array.isRequired,
    setSearchText: PropTypes.func.isRequired,
    onArtistSelect: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        artists: state.app.artists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSearchText: text => dispatch(actions.searchForArtists(text)),
        onArtistSelect: ar => dispatch(actions.selectArtist(ar)),
        addToFavorites: ar => dispatch(actions.addToFavorites(ar)),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);