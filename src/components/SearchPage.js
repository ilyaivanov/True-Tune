import React from 'react';

let mapArtist = artist => (
    <div className="grid-item artist-info" key={artist.id}>
        <div className="artist-image">
            <img src="https://lastfm-img2.akamaized.net/i/u/174s/1009add02ba54acc8e8047ef30f86e6f.png" alt="Foo"/>
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