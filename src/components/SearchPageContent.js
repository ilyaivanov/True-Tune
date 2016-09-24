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
        <div className="container">
            <div className="grid">
                <div className="cell">
                    <img src="https://lastfm-img2.akamaized.net/i/u/300x300/b3bba07ec5fe45b3a8b4f852d8cb118f.png"
                         className="responsive-image" />
                </div>

            </div>
        </div>
    </div>
</div>