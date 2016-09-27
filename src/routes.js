import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SearchPage from './components/SearchPage';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SearchPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
