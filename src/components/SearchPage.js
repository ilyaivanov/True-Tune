import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import debounce from 'lodash/debounce';

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
        console.log(text);
    }

    render() {
        let {searchTerm} = this.props;
        return (
            <div>
                <div className="search-area">
                    <h2>Search for an artist</h2>
                    <input autoFocus
                           type="text"
                           defaultValue={searchTerm}
                           onChange={this.onTextChanged}/>

                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        searchTerm: state.app.fooBar
    };
}

export default connect(
    mapStateToProps,
    () => ({})
)(SearchPage);