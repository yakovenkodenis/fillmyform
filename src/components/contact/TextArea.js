import React, { useRef, useEffect } from 'react';
import autosize from 'autosize';

const TextArea = props => {

    const textAreaRef = useRef();

    useEffect(() => {
        console.log('useEffect fired');
        autosize(textAreaRef.current);
    }, []);

    return (
        <div>
            <label htmlFor={props.name}>{props.label}</label>
            <textarea
                className="text-input"
                ref={textAreaRef}
                {...props}
            />
            {/* {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
            ) : null} */}
        </div>
    );
}

export default TextArea;
