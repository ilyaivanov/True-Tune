import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';
import * as actions from './../actions/fuelSavingsActions';
import Portlet from './ItemPortlet';

class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.onTextChangedDebounced = debounce(this.onTextChangedDebounced.bind(this), 500);
        this.onTextChanged = this.onTextChanged.bind(this);
    }

    onTextChanged(event) {
        this.onTextChangedDebounced(event.target.value);
    }

    onTextChangedDebounced(text) {
        this.props.setSearchText(text);
    }

    render() {
        let {searchTerm, artists} = this.props;
        artists = artists || [];
        return (
            <div>
                <div className="search-area">
                    <h2>Search for an artist</h2>
                    <input autoFocus
                           type="text"
                           defaultValue={searchTerm}
                           onChange={this.onTextChanged}/>
                </div>
                <div className="results-container grid-container">
                    {artists.map(artist => <Portlet key={artist.id} item={artist} link={`/artist/${artist.name}`} />)}
                </div>
            </div>
        );
    }
}
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