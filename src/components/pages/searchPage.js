import React from 'react';
import Artist from './../artist';
import {FormControl} from 'react-bootstrap';
import _ from 'lodash';
import './searchPage.css';
import './searchResults.css';
import Artists from './../../models/artists';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.delayedOnChange = _.debounce(this.delayedOnChange, 300);
    }

    onChange(event) {
        //http://stackoverflow.com/a/28046731/1283124
        event.persist();
        this.delayedOnChange(event);
    }

    delayedOnChange(event) {
        if (event.target.value) {
            Artists.findArtists(event.target.value);
        }
    }

    render() {
        return (<div id="wrapper">
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <FormControl
                                type="text"
                                placeholder="Start entering an artist name"
                                onChange={this.onChange.bind(this)}
                            />
                            <div className="list-group list-group-root well">
                                {this.props.artists.map(artist => <Artist key={artist.id}
                                                                          playlists={this.props.playlists}
                                                                          artist={artist}/>)}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default SearchPage;