import * as React from 'react';
import * as cx from 'classnames';

import Portlet from './Portlet';

export default (props: { albums: Album[] }) => (<div className="artist-albums-container grid-container">
    {props.albums.map((album: Album) => (
        <div className="grid-item artist-info"
            key={album.id}>
            <Portlet
                key={album.id}
                album={album} />
        </div>
    ))}
</div>);
