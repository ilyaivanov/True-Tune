import React from 'react';
import debounce from 'lodash/debounce';
import ItemPortlet from './ItemPortlet';
import {browserHistory} from 'react-router';
import {findArtists, findAlbums, findTracks} from './../services/lastfm';

export default class SearchPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchField: props.params.searchTerm || '',
            artists: []
        };

        this.applyChangesDebounced = debounce(this.applyChangesDebounced.bind(this), 500);
    }

    componentWillMount() {
        if (this.state.searchField) {
            this.applyChangesDebounced(this.state.searchField);
        }
    }

    onChange(text) {
        this.setState({searchField: text});
        this.applyChangesDebounced(text);
    }

    applyChangesDebounced(text) {
        findArtists(text).then(newArtists => {
            this.setState({artists: newArtists});
            //no assumption that setState has finished
            browserHistory.push('/' + text);
        });
    }

    render() {
        return <article className="content-article">
            <div className="search-area">
                <h2>Search for an artist</h2>
                <input type="text"
                       value={this.state.searchField}
                       onChange={e => this.onChange(e.target.value)}/>
            </div>
            <div className="results-container grid-container">
                {this.state.artists.map(artist => <ItemPortlet key={artist.id} item={artist} link="/artists/album"/>)}
            </div>
        </article>;
    }
}