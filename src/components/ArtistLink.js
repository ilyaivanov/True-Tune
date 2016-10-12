import React, { PropTypes as T }  from 'react';
import { Link } from 'react-router';

export default function ArtistLink({ artist, children }) {
    return (<div>
        <Link to={'/artist/' + artist.name}>{artist.name}</Link>{' '}
        {children}
    </div>);
}
ArtistLink.propTypes = {
    artist: T.object.isRequired,
    children: T.object.isRequired,
};

