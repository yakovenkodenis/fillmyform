import React from 'react';
import { Link } from 'react-router-dom';

const Checkbox = props => {

    return (
        <div>
            <label className="checkbox">
                {
                    props.url
                    ? <Link to={props.url} className="underline-link">{props.label}</Link>
                    : props.label
                }
                <input
                    type="checkbox"
                    {...props}
                />
            </label>
        </div>
    );
};

export default Checkbox;
