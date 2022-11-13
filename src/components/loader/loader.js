import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar';

import classes from './loader.module.scss';

const Loader = function(props) {
    const { isStop, packetTickets } = props;

    const [loaderLabel, setLoaderLabel] = useState('Загружаем билеты...');

    const [count, setCount] = useState(0);


    useEffect(() => {
        if (!isStop) {
            setCount(count + 4);
        } else {
            setCount(100);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStop, packetTickets]);

    const onLoaderFinished = () => {
        setLoaderLabel(null);
    };

    return (
        <div className = { classes['loader-wrapper'] }>
            <LoadingBar
                containerClassName = { classes.loader }
                height="6px"
                color="#2196F3"
                progress = { count }
                shadow = { false }
                onLoaderFinished = { onLoaderFinished }
            />
            <span>{loaderLabel}</span>
        </div>
    );
}

const mapStateToProps = ({ isStop, packetTickets }) => ({ isStop, packetTickets })

Loader.defaultProps = {
    packetTickets:[],
};

Loader.propTypes = {
    isStop: PropTypes.bool.isRequired,
    packetTickets: PropTypes.instanceOf(Array),
};

export default connect(mapStateToProps)(Loader);