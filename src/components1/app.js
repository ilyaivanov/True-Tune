import React from 'react';
import Header from './header';
import Playlists from './playlists';

class App extends React.Component{
    render(){
        var Page = (<div>Hello</div>);

        return (<div>
            <Header />
            <Playlists />
            {Page}
        </div>)
    }
}

export default App;

