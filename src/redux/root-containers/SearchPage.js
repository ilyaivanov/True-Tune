import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import SearchPageComponent from './../../components/SearchPage';
import * as actions from './../actions/fuelSavingsActions';

let SearchPage = props =>
    <SearchPageComponent onSearch={props.setSearchText}
                         artists={props.artists || []}/>;


SearchPage.propTypes = {
    artists: PropTypes.array.isRequired,
    setSearchText: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        artists: state.app.artists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSearchText: text => dispatch(actions.searchForArtists(text))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);