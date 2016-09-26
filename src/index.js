import React from 'react';
import {render} from 'react-dom';
import App from './App';
import SearchPage from './components/SearchPage';
import {Router, Route, browserHistory} from 'react-router';

render(
    <Router history={browserHistory}>
        <Route component={App}>
            <Route path="/(search/:searchTerm)" component={SearchPage}/>
        </Route>
    </Router>,
    document.getElementById('app'));
