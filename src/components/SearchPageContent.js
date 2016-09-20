import React from 'react';
import './SearchPageContent.scss';

export default () => <div>
    <div className="search-box">
        <input type="text" className="artist-search" placeholder="Search music"/>
    </div>

    <div className="search-tabs-box">
        <div>ARTISTS</div>
        <div className="active">ALBUMS</div>
        <div>SONGS</div>
    </div>

    <div className="results-box">
        results...
    </div>
</div>