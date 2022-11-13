import React from 'react';
import classes from './not-found-alert.module.scss';

const NotFoundAlert = function () {
    return (
        <div className = { classes['notFound-message'] }>
            <span>Рейсов, подходящих под заданные фильтры, не найдено!</span>
        </div>
    );
};

export default NotFoundAlert;