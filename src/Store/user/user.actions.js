import { STATES as MODEL_STATES } from '../../Models';
import axios from 'axios';
import { ACTIONS } from './user.reducer';
import { GLOBAL_ACTIONS } from '../global';
import { authActions } from '../auth';
import { ROUTES } from '../../Routes';

function getUser({ userID, model }) {

    return function _getUser(dispatch) {

        dispatch(request(userID));
        model.actions.setState(MODEL_STATES.LOADING);

        return axios.get(`/api/users/${userID}`)
            .then(response => {
                dispatch(success(response.data));
                model.actions.setState(MODEL_STATES.CLOSED);
            })
            .catch(error => {
                dispatch(failure(error));
                model.actions.setState(MODEL_STATES.CLOSED);
            });
    };

    function request(user) { return { type: ACTIONS.GET_USER_REQUEST, user }; }
    function success(user) { return { type: ACTIONS.GET_USER_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.GET_USER_FAILURE, error }; }
}

function updateUser({ userData, model }) {

    return function _updateUser(dispatch) {
        dispatch(request(userData));
        model.actions.setState(MODEL_STATES.LOADING);

        return axios.put(`/api/users/${userData._id}`, {
                userData
            })
            .then(response => {
                dispatch(success(response.data));
                model.actions.setState(MODEL_STATES.CLOSED);
            })
            .catch(error => {
                dispatch(failure(error));
                model.actions.setState(MODEL_STATES.FAILURE);
            });
    };

    function request(user) { return { type: ACTIONS.UPDATE_USER_REQUEST, user }; }
    function success(user) { return { type: ACTIONS.UPDATE_USER_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.UPDATE_USER_FAILURE, error }; }
}

function deleteUser({ userID, model }) {

    return function _deleteUser(dispatch) {
        dispatch(request(userID));
        model.actions.setState(MODEL_STATES.LOADING);

        return axios.delete(`/api/users/${userID}`)
            .then(response => {
                dispatch(success(userID));

                model.actions.createActions({
                    onClose: model => {
                        model.actions.redirect(ROUTES.HOME);
                        dispatch(authActions.getAuth())
                            .then(({ rules }) => {
                                console.log(rules)
                                dispatch({
                                    type: GLOBAL_ACTIONS.AUTH_PURGE,
                                    rules
                                });
                            });
                    }
                });

                model.actions.setState(MODEL_STATES.DELETE_ACCOUNT_SUCCESS);
            })
            .catch(error => {
                dispatch(failure(error));
                model.actions.setState(MODEL_STATES.DELETE_ACCOUNT_FAILURE);
            });
    };

    function request(userID) { return { type: ACTIONS.DELETE_USER_REQUEST, user: { _id: userID } }; }
    function success(userID) { return { type: ACTIONS.DELETE_USER_SUCCESS, user: { _id: userID } }; }
    function failure(error) { return { type: ACTIONS.DELETE_USER_FAILURE, error }; }
}

export {
    getUser,
    updateUser,
    deleteUser
};