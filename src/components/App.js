import React, {PropTypes as T} from 'react';
import Favorites from '../favotires/Favorites';
export default class App extends React.Component {

    static propTypes = {
        children : T.object.isRequired
    }

    render() {
        return (<table>
            <thead>
            <tr>
                <th>Page</th>
                <th>Favorites</th>
            </tr>
            </thead>
            <tbody>

            <tr>
                <td>{this.props.children}</td>
                <td><Favorites /></td>
            </tr>
            </tbody>
        </table>);
    }
}
