import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class Favorites extends React.Component {
    render() {
        return <ul>
            {this.props.favorites.map(f => <li key={f.id}><a href={f.name}>{f.name}</a></li>)}
        </ul>
    }
}

let mapStateToProps = state => ({ favorites: state.favorites });

function mapDispatchToProps(dispatch) {
    return {};
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorites);
