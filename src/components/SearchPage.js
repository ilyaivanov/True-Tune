import React from 'react';

let mapArtist = artist => (
    <div className="grid-item artist-info" key={artist.id}>
        <div className="artist-image">
            <img src={artist.image} alt="Foo"/>
            <div className="shadow"/>
            <div className="artist-options">
                <i className="fa fa-heart" aria-hidden="true"/>
                <i className="fa fa-ellipsis-h" aria-hidden="true"/>
            </div>
        </div>
        <div className="artist-title">{artist.name}</div>
    </div>);

export default ({onArtistSearch, artists}) => <article className="content-article">
    <div className="search-area">
        <h2>Search for an artist</h2>
        <input type="text" onChange={e => onArtistSearch(e.target.value)}/>
    </div>
    <div className="results-container grid-container">
        {artists.map(mapArtist)}
    </div>
</article>;