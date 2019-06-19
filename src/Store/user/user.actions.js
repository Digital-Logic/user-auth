import axios from 'axios';
import { ACTIONS } from './user.reducer';
import { GLOBAL_ACTIONS } from '../global';
import { authActions } from '../auth';
import { ROUTES } from '../../Routes';
import { SOCKET_ACTIONS } from '../SocketMiddleware';


function subscribeUserSocket(dispatch) {
    const handles = [ACTIONS.SYNC_USER_INFO]
        .map(event => ([
            event,
            dispatch({
                type: SOCKET_ACTIONS.SUBSCRIBE,
                event,
                handle: data =>
                    dispatch({
                        type: `RECEIVE: ${event}`,
                        user: data
                    })
            })
        ]));

    return () => {
        handles.forEach(([event, handle]) => {
            dispatch({
                type: SOCKET_ACTIONS.UNSUBSCRIBE,
                event,
                handle
            });
        });
    };
}

function getUser({ userID, setState, STATES }) {

    return function _getUser(dispatch) {

        dispatch(request(userID));
        setState(STATES.LOADING);

        return axios.get(`/api/users/${userID}`)
            .then(response => {
                dispatch(success(response.data));
                setState(STATES.CLOSED);
            })
            .catch(error => {
                dispatch(failure(error));
                setState(STATES.CLOSED);
            });
    };

    function request(user) { return { type: ACTIONS.GET_USER_REQUEST, user }; }
    function success(user) { return { type: ACTIONS.GET_USER_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.GET_USER_FAILURE, error }; }
}

function updateUser({ user, setState, STATES }) {

    return function _updateUser(dispatch) {
        dispatch(request(user));
        setState(STATES.LOADING);

        return axios.put(`/api/users/${user._id}`, user)
            .then(response => {
                dispatch(success(response.data));
                dispatch({
                    type: SOCKET_ACTIONS.EMIT,
                    event: ACTIONS.SYNC_USER_INFO,
                    data: response.data
                });

                setState(STATES.CLOSED);
            })
            .catch(error => {
                dispatch(failure(error));
                setState(STATES.ERROR, { message: error.message });
            });
    };

    function request(user) { return { type: ACTIONS.UPDATE_USER_REQUEST, user }; }
    function success(user) { return { type: ACTIONS.UPDATE_USER_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.UPDATE_USER_FAILURE, error }; }
}

function deleteUser({ userID, setState, STATES, history }) {

    return function _deleteUser(dispatch) {
        dispatch(request(userID));
        setState(STATES.DELETING_ACCOUNT);

        return axios.delete(`/api/users/${userID}`)
            .then(response => {
                dispatch(success(userID));

                history.push(ROUTES.HOME);
                dispatch(authActions.getAuth())
                    .then(({ rules }) => {
                        dispatch({
                            type: GLOBAL_ACTIONS.AUTH_PURGE,
                            rules
                        });

                        setState(STATES.DELETE_ACCOUNT_SUCCESS);
                    });
            })
            .catch(error => {
                dispatch(failure(error));
                setState(STATES.DELETE_ACCOUNT_FAILED);
                dispatch(authActions.getAuth())
                    .then(({ rules }) => {
                        dispatch({
                            type: GLOBAL_ACTIONS.AUTH_PURGE,
                            rules
                        });

                        setState(STATES.ERROR, { message: error.message });
                    });
            });
    };

    function request(userID) { return { type: ACTIONS.DELETE_USER_REQUEST, user: { _id: userID } }; }
    function success(userID) { return { type: ACTIONS.DELETE_USER_SUCCESS, user: { _id: userID } }; }
    function failure(error) { return { type: ACTIONS.DELETE_USER_FAILURE, error }; }
}

export {
    getUser,
    updateUser,
    deleteUser,
    subscribeUserSocket
};