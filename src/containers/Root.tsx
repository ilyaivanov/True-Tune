import * as React from "react";
import './Root.scss'
// import '../../node_modules/font-awesome/css/font-awesome.css';
import Player from './Player';

class App extends React.Component<{}, {}> {
    render() {
        const albums: Album[] = [
            {
                name: "Album1",
                image: "https://lastfm-img2.akamaized.net/i/u/174s/31635b1dc28540c3a93bb6b0f19e42fb.png",
                tracks: [
                    {
                        name: 'Intro',
                        duration: 1234,
                        isActive: false,
                        id: '1'
                    },
                    {
                        name: 'Robeast',
                        duration: 1234,
                        isActive: true,
                        id: '2'
                    },
                    {
                        name: 'Fracture',
                        duration: 1234,
                        isActive: false,
                        id: '3'
                    },
                    {
                        name: 'Thrasher',
                        duration: 1234,
                        isActive: false,
                        id: '4'
                    },
                ]
            }
        ];

        return (<div>
            <main className="page-content">
                <nav className={'navigation'}>
                    Favorites
                </nav>

                <article className="page">
                    props.children
                </article>
                <aside className={'player-sidebar'}>
                    <Player {...albums[0]} />
                </aside>
            </main>
        </div>);
    }
}

export default App;