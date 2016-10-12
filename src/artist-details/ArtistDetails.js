import React, {PropTypes as T} from 'react';

export default function ArtistDetails(props) {
    return (<div>
        <h2>Details</h2>
        <h4>{props.params.artistName}</h4>
    </div>);
}
ArtistDetails.propTypes = {
    params: T.object.isRequired
};
