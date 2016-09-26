import React from 'react';
import ItemPortlet from './ItemPortlet';

export default function SearchPage({artists, onArtistSearch, onArtistSelect}) {
    return <article className="content-article">
        <div className="search-area">
            <h2>Search for an artist</h2>
            <input type="text" onChange={e => onArtistSearch(e.target.value)}/>
        </div>
        <div className="results-container grid-container">
            {artists.map(artist => <ItemPortlet key={artist.id} item={artist} onItemClick={onArtistSelect}/>)}
        </div>
    </article>;
}