import React from 'react';

const TextInput = props => {

    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                className="text-input"
                {...props}
            />
            {/* {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
            ) : null} */}
        </div>
    );
}

export default TextInput;
