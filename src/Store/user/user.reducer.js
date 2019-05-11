import { GLOBAL_ACTIONS, purgeData } from '../global';

const ACTIONS = Object.freeze({
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAILURE: 'GET_USER_FAILURE',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',
    DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILURE: 'DELETE_USER_FAILURE'
});


function reducer(state={}, { type, user, rules }) {
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
            return Object.entries(state).reduce((state, [userID, data]) => {
                if (userID !== user._id)
                    state[userID] = data;
                return state;
            }, {});

        case GLOBAL_ACTIONS.AUTH_PURGE:
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
    reducer as userReducer,
    ACTIONS
};