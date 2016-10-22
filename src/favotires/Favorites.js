import React, {PropTypes as T} from 'react';
import {connect} from 'react-redux';
import ArtistLink from './../components/ArtistLink';
import {Link} from 'react-router';
class Favorites extends React.Component {

    static propTypes = {
        favorites: T.array.isRequired
    };

    render() {
        return (<div>
            <b><Link to="/">Search...</Link></b><br/>
            <b>Favorites:</b>
            <ul>
                {this.props.favorites.map(f => <li key={f.id}><ArtistLink artist={f}/></li>)}
            </ul>
        </div>);
    }
}

let mapStateToProps = state => ({favorites: state.favorites});

function mapDispatchToProps(/*dispatch*/) {
    return {};
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorites);
