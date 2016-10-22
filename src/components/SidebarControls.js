import React from 'react';
import './SidebarControls.scss';

export default props => {
    let navigationTogglerSymbol = props.ui.navigationShown ? '<' : '>';
    let playerTogglerSymbol = props.ui.playerShown ? '>' : '<';

    return (<div className="sidebar-conrols">
        <button onClick={() =>props.toggleNavigation()}>{navigationTogglerSymbol}</button>
        <button onClick={() =>props.togglePlayer()}>{playerTogglerSymbol }</button>
    </div>);
}