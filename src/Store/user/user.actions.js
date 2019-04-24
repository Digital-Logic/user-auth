import { ACTIONS } from './index';
import { modelActions, MODEL_STATES, authActions } from '../index';
import axios from 'axios';

function getUser(userID) {
    return function _getUser(dispatch) {

        const model = dispatch(modelActions.createLoadingModel({ title: "Loading Profile" }));
        dispatch(request());

        return axios.get(`/api/users/${userID}`)
            .then(response => {
                dispatch(modelActions.destroyModel(model));
                dispatch(success(response.data));
            })
            .catch(err => {
                dispatch(failure(err));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.FAILURE,
                    title: "Error Loading User",
                    message: "Error retrieving user data."
                }));
            });
    };

    function request() { return { type: ACTIONS.GET_USER_REQUEST };}
    function success(user) { return { type: ACTIONS.GET_USER_SUCCESS, user };}
    function failure(err) { return { type: ACTIONS.GET_USER_FAILURE, err };}
}

function updateUser(user) {
    return function _updateUser(dispatch) {

        const model = dispatch(modelActions.createLoadingModel({ title: "Updating User" }));
        dispatch(request());

        return axios.put(`/api/users/${user._id}`, user)
            .then(response => {
                dispatch(modelActions.destroyModel(model));
                return dispatch(success(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(failure);
                dispatch(modelActions.updateModel({
                    state: MODEL_STATES.FAILURE,
                    title: "Error Update User",
                    message: err.message
                }));
            });

    };

    function request() { return { type: ACTIONS.UPDATE_USER_REQUEST }; }
    function success(user) { return { type: ACTIONS.UPDATE_USER_SUCCESS, user }; }
    function failure(err) { return { type: ACTIONS.UPDATE_USER_FAILURE };}
}

function deleteUser(user) {
    return function _deleteUser(dispatch) {
        dispatch(request());
        const model = dispatch(modelActions.createLoadingModel({
            title: "Deleting User Account",
            conform: 'Delete User'
        }));

        return axios.delete(`/api/users/${user._id}`)
            .then(result => {
                dispatch(success(user));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.SUCCESS,
                    message: "User account has been deleted."
                }));
                dispatch(authActions.getAuth());
            })
            .catch(error => {
                console.log(error);
                dispatch(failure(error));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.FAILURE,
                    title: 'Error Deleting User',
                    message: typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : error.response.data
                }));
            });
    }

    function request() { return { type: ACTIONS.DELETE_USER_REQUEST }; }
    function success(user) { return { type: ACTIONS.DELETE_USER_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.DELETE_USER_FAILURE, error }; }
}

export {
    getUser,
    updateUser,
    deleteUser
};