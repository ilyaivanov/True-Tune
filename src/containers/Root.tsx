import * as React from "react";
import './Root.scss'
// import '../../node_modules/font-awesome/css/font-awesome.css';
import Player from '../components/Player';
import ArtistDetails from '../components/ArtistDetails';

import {albums, artist} from '../types/data/artist';

class App extends React.Component<{}, {}> {
    render() {
        return (<div>
            <main className="page-content">
                <nav className={'navigation'}>
                    Favorites
                </nav>

                <article className="page">
                    {this.props.children}
                </article>
                <aside className={'player-sidebar'}>
                    <Player {...albums[0]} />
                </aside>
            </main>
        </div>);
    }
}

export default App;