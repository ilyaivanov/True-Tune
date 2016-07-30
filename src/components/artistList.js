import React from 'react';

let maper = a => <div key={a.id}>{a.text}</div>;

let ArtistsList = function (props) {
    return (<div>
        {props.artists.map(maper)}
    </div>)
};

export default ArtistsList;