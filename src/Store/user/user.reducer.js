import { GLOBAL_ACTIONS, purgeData } from '../util';

const ACTIONS = Object.freeze({
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAILURE: 'GET_USER_FAILURE',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',
    DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILURE: 'DELETE_USER_FAILURE',
});


const initialState = {};

function reducer(state=initialState, { type, user, error, rules }) {
    switch(type) {
        case ACTIONS.GET_USER_SUCCESS:
            return {
                ...state,
                [user._id]: { ...user, __type: 'User' }
            };
        case ACTIONS.UPDATE_USER_SUCCESS:
            return {
                ...state,
                [user._id]: { ...user, __type: 'User' }
            };
        case ACTIONS.DELETE_USER_SUCCESS:
            return Object.entries(state).filter(([_id, user]) => _id !== user._id)

        case GLOBAL_ACTIONS.PURGE_DATA:
            // Purge all data that the current user cannot see.
            return purgeData({
                access: 'read',
                subject: 'User',
                data: state,
                rules
            });

        default:
            return state;
    }
}

export {
    reducer,
    ACTIONS
};