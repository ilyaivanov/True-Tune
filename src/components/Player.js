import React from 'react';

export default ({onArtistSearch}) => <aside className="content-sidebar">
    <img src="https://lastfm-img2.akamaized.net/i/u/300x300/b3bba07ec5fe45b3a8b4f852d8cb118f.png" alt/>
    <div className="player">
        <div className="track-progress-container">
            <div className="track-progress" style={{width: '33%'}}/>
        </div>
        <div style={{textAlign: 'center'}}>
            Real &amp; True <br />
            <small>0:35 - 3:45</small>
        </div>
        <div className="controls">
            <i className="fa fa-step-backward" aria-hidden="true"/>
            <i className="fa fa-play" aria-hidden="true"/>
            <i className="fa fa-step-forward" aria-hidden="true"/>
        </div>
        <div className="volume-meter">
            <i className="fa fa-volume-down" aria-hidden="true"/>
            <input type="range"/>
            <i className="fa fa-volume-up" aria-hidden="true"/>
        </div>
    </div>
    <div className="player-list">
        <div className="player-item">1. Dreaming
            <small>3:45</small>
        </div>
        <div className="player-item active">2. Real &amp; True
            <small>3:45</small>
        </div>
        <div className="player-item">3. Within My Heart
            <small>3:45</small>
        </div>
        <div className="player-item">4. More Than Yesterday
            <small>3:45</small>
        </div>
        <div className="player-item">5. Calling
            <small>3:45</small>
        </div>
    </div>
</aside>;