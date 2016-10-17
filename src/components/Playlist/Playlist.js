import React from 'react';
import $ from 'jquery';
import 'jstree';
import './styles.css';
export default class Playlist extends React.Component {

    componentDidMount() {
        init($(this._tree), this.props.playlists);
    }

    componentWillUpdate(newProps) {
        $(this._tree).jstree('destroy');
        init($(this._tree), newProps.playlists);
    }

    render() {
        return (
            <div>
                <b>Playlists</b>
                <ul className="tree">
                    <li><a href="">+</a>Animals
                        <ul>
                            <li>Birds</li>
                            <li>Mammals
                                <ul>
                                    <li>Elephant</li>
                                    <li>Mouse</li>
                                </ul>
                            </li>
                            <li>Reptiles</li>
                        </ul>
                    </li>
                    <li>Plants
                        <ul>
                            <li>Flowers
                                <ul>
                                    <li>Rose</li>
                                    <li>Tulip
                                        <ul>
                                            <li>List item 1</li>
                                            <li>List item 2
                                                <ul>
                                                    <li>List item 2.1</li>
                                                    <li>List item 2.2</li>
                                                    <li>List item 2.3</li>
                                                </ul>
                                            </li>
                                            <li>List item 3</li>
                                            <li>List item 4</li>
                                            <li>List item 5
                                                <ul>
                                                    <li>List item 5.1</li>
                                                    <li>List item 5.2
                                                        <ul>
                                                            <li>List item 5.2.1</li>
                                                            <li>List item 5.2.2</li>
                                                            <li>List item 5.2.3</li>
                                                            <li>List item 5.2.4</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>List item 6</li>
                                            <li>List item 7</li>
                                            <li>List item 8</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li>Trees</li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }

}

function init(root, playlists) {
    root.jstree({
        core: {
            check_callback: true,
            themes: {
                name: 'proton',
                responsive: true
            },

            data: playlists
        },
        plugins: [
            // "dnd"
        ]
    }).on('changed.jstree', function (e, data) {
        if (data.selected && data.selected.length > 0) {
            let firstSelectedArtistName = data.instance.get_node(data.selected[0]).text;
            console.log(firstSelectedArtistName);
        }
    });
}
