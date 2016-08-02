import React from 'react';
import 'react-select2-wrapper/css/select2.css';
import lastfm from './../loaders/lastfm';
import Sidebar from './sidebar/sidebar';
import {FormControl} from 'react-bootstrap';
import SearchResults from './searchResults';
import './../../node_modules/bootstrap/dist/css/bootstrap.css'

class Core extends React.Component {
    constructor(props) {
        super(props);

        var tracks = [
            {name: "Track 1", id: "111"},
            {name: "Track 2", id: "112"},
            {name: "Track 3", id: "113"},
            {name: "Track 4", id: "114"},
        ];

        var albums = [
            {name: "First Album", id: "11", tracks: tracks},
            {name: "Second Album", id: "12", tracks: tracks},
            {name: "Third Album", id: "13", tracks: tracks},
        ];
        this.state = {
            artists: [
                {name: 'First Artist', id: "1", albums: albums},
                {name: 'Second Artist', id: "2", albums: albums},
                {name: 'Third Artist', id: "3", albums: albums},
            ]
        };

    }

    render() {
        function select(p) {
            var newState = this.state;
            newState.artists.push(p.params.data);
            this.setState(newState);
        }

        var configuration = {
            ajax: {
                url: function (params) {
                    return "http://ws.audioscrobbler.com/2.0?method=artist.search&api_key=185032d80f1827034396b9acfab5a79f&format=json&artist=" + params.term;
                },
                processResults: function (data) {
                    var artists = data.results.artistmatches.artist.map(a => ({text: a.name, id: a.id}));
                    return {
                        results: artists.slice(0, 25)
                    };
                }
            },
            delay: 250,
            minimumInputLength: 1

        };

        function toggleAlbums(artist) {
            var self = this;
            artist.isAlbumsVisible = !artist.isAlbumsVisible;
            if (!artist.albums) {
                lastfm.findAlbums(artist.text)
                    .then(function (albums) {
                        artist.albums = albums;
                        self.forceUpdate();
                    });
            } else {
                this.forceUpdate();
            }
        }


        function toggleTracks(album) {
            var self = this;
            album.isTracksVisible = !album.isTracksVisible;
            if (!album.tracks) {
                lastfm.findTracks(album)
                    .then(function (tracks) {
                        album.tracks = tracks;
                        self.forceUpdate();
                    });
            } else {
                this.forceUpdate();
            }
        }

        function onChange() {
            console.log('change');
        }

        var self = this;

        function toggleArtist(artist) {
            artist.areAlbumsShown = !artist.areAlbumsShown;
            console.log(artist);
            self.forceUpdate();
        }

        function toggleAlbum(album) {
            album.areTracksShown = !album.areTracksShown;
            console.log(album);
            self.forceUpdate();
        }

        return (<div id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <FormControl
                                type="text"
                                placeholder="Start entering an artist name"
                                onChange={onChange}
                            />
                            <br/>
                            <SearchResults toggleArtist={toggleArtist}
                                           toggleAlbum={toggleAlbum}
                                           artists={this.state.artists}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Core;