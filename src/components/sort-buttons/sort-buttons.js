import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSortButtons } from '../../actions/index';
import classes from './sort-buttons.module.scss';

const SortButtons = function (props) {
    const { sortButtons, updateSortButtons } = props;

    // получает sortButtons из store и отрисовывает на стрнице
    const buttons = sortButtons.map(({ name, label, isActive }) => {
        let className;

        // если isActive элемента true, то присваивает active класс
        if (isActive) {
            className = classes.active;
        }

        // обрабатывает клик по элементу
        const onClick = () => {
            const newArr = [...sortButtons].map((el) => {
                if (el.name === name) {
                    el.isActive = true;
                } else {
                    el.isActive = false;
                }
                return el;
            });
            // вызывет экшен updateSortButtons и передает новый масиив
            updateSortButtons(newArr);
        };

        return (
            <div key = { name }
                 onClick = { onClick }
                 onKeyDown = { onClick }
                 role = "button"
                 tabIndex = {0}
                 className = { className }>
                { label }
            </div>
        );
    });

    return <div className = { classes['sort-buttons'] }>
                {buttons}
            </div>;
};

const mapStateToProps = ({ sortButtons }) => ({ sortButtons })

const mapDispatchToProps = (dispatch) => ({
    updateSortButtons: (newSortButtons) => dispatch(updateSortButtons(newSortButtons)),
});

SortButtons.defaultProps = {
    sortButtons:[]
};

SortButtons.propTypes = {
    sortButtons: PropTypes.arrayOf(PropTypes.object),
    updateSortButtons:PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(SortButtons);