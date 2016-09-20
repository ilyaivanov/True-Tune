import React from 'react';
import './components/Layout.scss';

import SearchPageContent from './components/SearchPageContent';

class App extends React.Component {
    render() {
        return <main className="page-content">
            <nav className="content-navigation">
                <h1>Navigation</h1>
            </nav>
            <article className="content-article">
                <SearchPageContent/>
            </article>
            <aside className="content-sidebar">
                <h1>Sidebar</h1>
            </aside>
        </main>;
    }
}
export default App;

