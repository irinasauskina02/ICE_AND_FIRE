import React from 'react';
import './error.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <h4>Something goes wrong :(</h4>
            <img src={img}></img>
            
        </>
    );
}

export default ErrorMessage;

