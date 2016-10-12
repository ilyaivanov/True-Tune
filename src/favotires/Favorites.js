import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import ArtistLink from './../components/ArtistLink';

class Favorites extends React.Component {

    static propTypes = {
        favorites: T.array.isRequired
    };

    render() {
        return (<ul>
            {this.props.favorites.map(f => <li key={f.id}><ArtistLink artist={f}/></li>)}
        </ul>);
    }
}

let mapStateToProps = state => ({ favorites: state.favorites });

function mapDispatchToProps(/*dispatch*/) {
    return {};
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorites);
