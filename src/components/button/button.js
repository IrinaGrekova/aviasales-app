import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateTicketsCounter } from '../../actions/index';
import classes from './button.module.scss';

const Button = function (props) {

    const{ ticketsCounter, updateTicketsCounter } = props;

    // прибавляет 5 билетов к ticketsCounter в state
    const onClick = () => {
        const count = ticketsCounter + 5;
        updateTicketsCounter(count);
    };

    return (
        <div className = { classes['button-show-more__wrapper'] }>
            <button type="button" onClick = { onClick }>
                Показать еще 5 билетов!
            </button>
        </div>
    );
};

const mapStateToProps = ({ ticketsCounter }) => ({ ticketsCounter });

const mapDispatchToProps = (dispatch) => ({
    updateTicketsCounter: (newCounter) => dispatch(updateTicketsCounter(newCounter)),
})


Button.defaultProps = {
    ticketsCounter: 5,
};

Button.propTypes = {
    updateTicketsCounter:PropTypes.func.isRequired,
    ticketsCounter: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
