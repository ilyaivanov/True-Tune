import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import SearchPage from './components/SearchPage';
import ArtistDetails from './components/ArtistDetails';
import NotFoundPage from './components/NotFoundPage.js';


//Router is confused at github host ilyaivanov.github.io/True-Tune
//if a repository name is changed, you will need to change this literal
const repositoryName = 'True-Tune';

export default (
    <Route path={`/(${repositoryName})`} component={App}>
        <IndexRoute component={SearchPage}/>
        <Route path="/artist/:artistName" component={ArtistDetails}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);
