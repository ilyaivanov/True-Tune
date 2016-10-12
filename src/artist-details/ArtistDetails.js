import React, {PropTypes as T} from 'react';
import {Link} from 'react-router';

export default function ArtistDetails(props) {
    return (<div>
        <span><Link to="/">search</Link></span>
        <h2>Details</h2>
        <h4>{props.params.artistName}</h4>
    </div>);
}
ArtistDetails.propTypes = {
    params: T.object.isRequired
};
