import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classnames from 'classnames';

const CollapsibleDropdown = props => {

    const [show, toggleShow] = useState(false);
    let location = useLocation();

    const className = classnames({
        'collapse': true,
        'list-unstyled': true,
        'show': ((
            show
            || props.items.some(item => props.toggleActive(location.pathname, item.href) === 'active')
        ) && !props.items.every(item => item.href === location.pathname))
            || props.toggleActive(location.pathname, '/forms') === 'active'
    });

    return (
        <li onClick={() => { toggleShow(!show); }}>
            <Link
                to="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
            >
                {props.name}
            </Link>
            <ul className={className} id="pageSubmenu">
                {props.items.map(item => (
                    <li
                        key={item.href}
                        className={props.toggleActive(location.pathname, item.href)}
                    >
                        <Link to={item.href}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}

export default CollapsibleDropdown;
