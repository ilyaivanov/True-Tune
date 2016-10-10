import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class ItemPortlet extends React.Component {
    render() {
        let {item, link, onClick} = this.props;

        onClick = onClick || (() => { });
        let addToFavorites = (e, item) => {
            if(this.props.addToFavorites){
              this.props.addToFavorites(item);
            }
            e.stopPropagation();
            e.preventDefault();
        }
        let child = (
            <div>
                <div className="artist-image">
                    <img src={item.image} alt="Foo"/>
                    <div className="shadow"/>
                    <div className="artist-options">
                        <i className="fa fa-heart-o" onClick={e => addToFavorites(e, item)} aria-hidden="true"/>
                    </div>
                </div>
                <div className="artist-title">{item.name}</div>
            </div>);
        if (link) {
            return (<Link className="grid-item artist-info" to={link} onClick={onClick}>
                {child}
            </Link>);
        }
        else {
            return (<div className="grid-item artist-info" onClick={onClick}>
                {child}
            </div>);
        }
    }
}

ItemPortlet.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    link: PropTypes.string
};
