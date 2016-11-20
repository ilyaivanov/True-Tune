import * as React from 'react';
import { Link } from 'react-router';

import Portlet from './Portlet';

export default (props: { artists: Artist[] }) => (
    <div>
        <div className="search-area">
            <h2>Search for an artist</h2><input type="text" />
        </div>
        <div className="results-container grid-container">
            {props.artists.map(artist => (
                <div className="grid-item artist-info"
                    key={artist.id}>
                    <Portlet
                        key={artist.id}
                        item={artist} />
                </div>))}
        </div>
    </div>
)
