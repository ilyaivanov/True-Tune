import * as React from "react";
import './Root.scss'

class App extends React.Component<{}, {}> {

    render() {
        return (<div>
            <main className="page-content">
                <nav className={'navigation'}>
                    Favorites
                </nav>

                <article className="page">
                    props.children
                </article>
                <aside className={'player-sidebar'}>
                    Player
                </aside>
            </main>
        </div>);
    }
}

export default App;