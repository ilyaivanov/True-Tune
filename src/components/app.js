import React from 'react';
import Select2 from 'react-select2-wrapper';
import ArtistsList from './artistList';
import 'react-select2-wrapper/css/select2.css';
import lastfm from './../loaders/lastfm';
class Core extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: []
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
                    var artists = data.results.artistmatches.artist.map(a => ({text: a.name, id: a.mbid}));
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
                    .then(function(albums) {
                        artist.albums = albums;
                        self.forceUpdate();
                    });
            } else {
                this.forceUpdate();
            }
        }

        return (<div>
            <Select2
                className="mySelect"
                style={{width: '100%'}}
                onSelect={select.bind(this)}
                options={configuration}
            />

            <ArtistsList artists={this.state.artists} toggleAlbum={toggleAlbums.bind(this)}/>
        </div>);
    }
}

export default Core;