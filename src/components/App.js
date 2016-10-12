import React from 'react';
import Search from '../search/Search';
import Favorites from '../favotires/Favorites';
export default class App extends React.Component {
    render() {
        return <table>
            <thead>
            <tr>
                <th>Search</th>
                <th>Favorites</th>
            </tr>
            </thead>
            <tbody>

            <tr>
                <td><Search /></td>
                <td><Favorites /></td>
            </tr>
            </tbody>
        </table>;
    }
}
