import React from 'react';
import icon from '../../images/error_Icon.png';
import classes from './error-alert.module.scss';

const ErrorAlert = function () {
    return (
        <div className = { classes['error-message'] }>
            <img src = { icon } alt="error" />
            <span>Error!</span>
        </div>
    );
};

export default ErrorAlert;