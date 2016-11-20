import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, Link, hashHistory } from 'react-router';
import { albums, artist } from './types/data/artist';
import App from "./containers/Root";

import ArtistDetails from './components/ArtistDetails';
import ArtistAlbums from './components/ArtistAlbums';
import ArtistSimilar from './components/ArtistSimilar';

const ArtistDetailsHard = (props) => (<ArtistDetails artist={artist} {...props} />);

const ArtistAlbumsHard = () => (<ArtistAlbums albums={albums} />);
const ArtistSimilarHard = () => (<ArtistSimilar artist={artist} />);

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="artist" component={ArtistDetailsHard} >
                <Route path="albums" component={ArtistAlbumsHard} />
                <Route path="similar" component={ArtistSimilarHard} />
            </Route>
        </Route>
    </Router>,
    document.getElementById("app")
);
