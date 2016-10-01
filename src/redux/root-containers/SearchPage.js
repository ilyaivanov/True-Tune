import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import SearchPageComponent from './../../components/SearchPage';
import * as actions from './../reducers';

class SearchPage extends React.Component {
    render() {
        return <SearchPageComponent onSearch={this.props.setSearchText}
                                    onArtistSelect={this.props.onArtistSelect}
                                    artists={this.props.artists || []}/>;
    }
}

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
        onArtistSelect: ar => dispatch(actions.selectArtist(ar))
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPage);