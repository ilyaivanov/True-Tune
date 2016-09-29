import React, {PropTypes} from 'react';
import debounce from 'lodash/debounce';
import Portlet from './ItemPortlet';

export default function SearchPage(props) {

    let triggerSearchChangeDebounced = debounce(function (text) {
        props.onSearch(text);
    }, 500);

    return (<div>
        <div className="search-area">
            <h2>Search for an artist</h2>
            <input autoFocus
                   type="text"
                   defaultValue={props.searchTerm}
                   onChange={event => triggerSearchChangeDebounced(event.target.value)}/>
        </div>
        <div className="results-container grid-container">
            {props.artists.map(artist => <Portlet key={artist.id}
                                                  onClick={() => props.onArtistSelect(artist)}
                                                  item={artist}
                                                  link={`/artist/${artist.name}`}/>)}
        </div>
    </div>);
}

SearchPage.propTypes = {
    artists: PropTypes.array.isRequired,
    onArtistSelect: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func.isRequired
};