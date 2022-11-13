import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import classes from './app.module.scss';
import { getPacketTickets, updateSearchId, ticketsError } from '../../actions/index';

import Logo from '../logo';
import Filters from '../filters';
import SortButtons from '../sort-buttons';
import TicketsList from '../tickets-list';
import Loader from '../loader';

import apiService from '../../services/api-service';

class App extends Component {

    componentDidMount() {
        const {updateSearchId, getPacketTickets, ticketsError} = this.props;
        apiService
            .getKey()
            .then((searchId) => {
                // сохраняет в redux searchId
                updateSearchId(searchId);
                // сохраняет в redux packetTickets
                getPacketTickets(searchId);
            })
            .catch((err) => {
                ticketsError(err);
            });
    }

    componentDidUpdate(prevProps) {

        const { error, isStop, packetTickets, getPacketTickets, searchId } = this.props;

        if (
            prevProps.packetTickets !== packetTickets &&
            error === null &&
            isStop === false
        ) {
            getPacketTickets(searchId);
        }
    }

    render() {
        const { error } = this.props
        return (
            <div className = { classes.app }>
                <header className = { classes.header }>
                    <div className = { classes['header__logo-wrapper'] }>
                        <Logo />
                    </div>
                </header>
                <main className = { classes.main }>
                    { !error ? <Loader /> : null }
                    <section className = { classes['main__content-wrapper'] }>
                        <div>
                            <Filters />
                        </div>
                        <div className = { classes.main__content }>
                            <div>
                                <SortButtons />
                            </div>
                            <div>
                                <TicketsList />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

const mapStateToProps = ({ error, isStop, searchId, packetTickets }) => ({error, isStop, searchId, packetTickets});

const mapDispatchToProps = (dispatch) => ({
    getPacketTickets: (packetTickets) => dispatch(getPacketTickets(packetTickets)),
    updateSearchId: (searchId) => dispatch(updateSearchId(searchId)),
    ticketsError: (error) => dispatch(ticketsError(error)),
});


App.defaultProps = {
    packetTickets: [],
    error:false,
    isStop:false,
    searchId: ''
};

App.propTypes = {
    packetTickets:PropTypes.array,
    updateSearchId:PropTypes.func,
    getPacketTickets:PropTypes.func.isRequired,
    ticketsError:PropTypes.func.isRequired,
    error:PropTypes.bool,
    isStop:PropTypes.bool,
    searchId: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(App);