import React, {PropTypes as T} from 'react';
import Favorites from '../favotires/Favorites';
import './App.scss';

export default class App extends React.Component {

    static propTypes = {
        children: T.object.isRequired
    };

    render() {
        return (<div>
            <main className="page-content">
                <nav className="navigation" >
                    <Favorites/>
                </nav>

                <article className="page">
                    {this.props.children}
                </article>
                <aside className="player">
                </aside>
            </main>
        </div>);
    }
}
