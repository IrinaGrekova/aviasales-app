import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFilters } from '../../actions/index';
import classes from './filters.module.scss';

const Filters = function (props) {
    const { filterItems, updateFilters } = props;

    // счетчик выбранных фильтров
    let countSelectedFilters = 0;

    // рендерит фильтры на страницу
    const filters = [...filterItems].map(({ label, name, isCheck }) => {
        // если фильтр зачекан isCheck = true увеличивает счетчик
        if (isCheck) {
            countSelectedFilters+=1;
        }

        // следит за изменением чекбоксов
        const onChange = (event) => {
            // новый массив фиьтров который будет изменяться в зависимости от условия
            const newArrFilters = [...filterItems];

            // Если включается галочка "Все" - проставляются галочки всем остальным фильтрам
            if (name === 'all' && isCheck === false) {
                newArrFilters.map((el) => {
                    el.isCheck = true;
                    return el;
                });
            }

            // Если снимается галочка "Все" - снимаются все остальные фильтры
            if (name === 'all' && isCheck === true) {
                newArrFilters.map((el) => {
                    el.isCheck = false;
                    return el;
                });
            }

            // Если при включенной галочке "Все" снимается любая другая галочка - галочка "Все" тоже снимается
            if (name !== 'all') {
                // если выбран фильтр не "Все", то просто меняет фильтру isCheck на event.target.checked
                newArrFilters.map((el) => {
                    if (el.name === name) {
                        el.isCheck = event.target.checked;
                        if (!event.target.checked) {
                            countSelectedFilters-=1; // !но если это false, то счетчик уменьшается
                        }
                    }
                    // галочка с фильтра "Все" снимается
                    if (el.name === 'all') {
                        el.isCheck = false;
                    }
                    return el;
                });
            }

            // Если проставить каждую галочку по пересадкам - галочка "Все" автоматически включится
            if (countSelectedFilters === 3 && name !== 'all') {
                // если уже выбраны 3 фильтра, то при выборе следующего (последнего не 'all') галочки проставляются всем
                newArrFilters.map((el) => {
                    el.isCheck = true;
                    return el;
                });
            }

            // вызов экшена для изменения состояния фильтров в store redux
            updateFilters(newArrFilters);
        };

        return (
            <li key = { name }>
                <label className = { classes['checkbox-label'] }>
                    <input type="checkbox"
                           className = { classes['checkbox-input']}
                           checked = { isCheck }
                           onChange = { onChange } />
                    <span className = { classes['check-box'] } />
                    {label}
                </label>
            </li>
        );
    });

    return (
        <div className = { classes.filters }>
            <div>Количество пересадок</div>
            <ul>{filters}</ul>
        </div>
    );
};

const mapStateToProps = ({ filterItems }) => ({ filterItems })

const mapDispatchToProps = (dispatch) => ({
    updateFilters: (newFilters) => dispatch(updateFilters(newFilters)),
})



Filters.propTypes = {
    filterItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    updateFilters: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);