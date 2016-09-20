import React from 'react';
import './components/Layout.scss';

class App extends React.Component {
    render() {
        return <main className="page-content">
            <nav className="content-navigation">
                <h1>Navigation</h1>
            </nav>
            <article className="content-article">
                <h1>Main Content</h1>
            </article>
            <aside className="content-sidebar">
                <h1>Sidebar</h1>
            </aside>
        </main>;
    }
}
export default App;

