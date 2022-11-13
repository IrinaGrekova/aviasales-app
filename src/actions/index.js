import apiService from '../services/api-service';

// обновляет данные о выбранной сортироке
export const updateSortButtons = (newSortButtons) => ({
    type: 'UPDATE_SORT_BUTTONS',
    payload: newSortButtons,
})

// обновляет данные о выбранных фильрах
export const updateFilters = (newFilters) => ({
    type: 'UPDATE_FILTERS',
    payload: newFilters,
});

// обновляет searchId
export const updateSearchId = (searchId) => ({
    type: 'UPDATE_SEARCH_ID',
    payload: searchId,
})

// обновляет список билетов
export const updatePacketTickets = (packetTickets) => ({
    type: 'UPDATE_PACKET_TICKETS',
    payload: packetTickets,
})

// обновляет количество показываемых билетов
export const updateTicketsCounter = (newCounter) => ({
    type: 'UPDATE_TICKETS_COUNTER',
    payload: newCounter,
})

// переключает isStop в true по окончании загрузки всех блилетов
export const toggleStop = (booleanValue) => ({
    type: 'TOGGLE_STOP',
    payload: booleanValue,
})

// обновляет поле error
export const ticketsError = (error) => ({
    type: 'TICKETS_ERROR',
    payload: error,
})

// получает билеты и сохраняет в store
export const getPacketTickets = (searchId) => ((dispatch) => {
    // получает билеты
    apiService.getTickets(searchId).then((res) => {
        // сохраняет билеты в store
        dispatch(updatePacketTickets(res.tickets));
        // если от сервера пришло, что stops: true обновляет isStop
        if (res.stop) {
            dispatch(toggleStop(res.stop));
        }
    });
})

