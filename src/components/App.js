import React, {PropTypes} from 'react';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <main className="page-content">
                    <nav className="content-navigation">
                    </nav>
                    <article className="content-article">
                        {this.props.children}
                    </article>
                    <aside className="content-sidebar">
                        {/*{player}*/}
                    </aside>
                </main>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element
};
