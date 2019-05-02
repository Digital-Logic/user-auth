import { ACTIONS } from './auth.reducer';
import { STATES as MODEL_STATES } from '../../Models';
import { ROUTES } from '../../Routes';
import axios from 'axios';
import jwt from 'jsonwebtoken';


function getAuth(model) {

    return function _getAuth(dispatch) {
        dispatch(request());
        model.setState(MODEL_STATES.LOADING);

        return axios.get('/api/auth/sign-in')
            .then(response => {
                dispatch(success(response.data));
                model.setState(MODEL_STATES.CLOSED);
            })
            .catch(error => {
                dispatch(failure(error));
                model.setState(MODEL_STATES.CLOSED);
            });
    };

    function request() { return { type: ACTIONS.GET_AUTH_REQUEST }; }
    function success(user) { return { type: ACTIONS.GET_AUTH_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.GET_AUTH_FAILURE, error }; }
}

function signUp({ model, userData }) {

    return function _signUp(dispatch) {
        dispatch(request());
        model.setState(MODEL_STATES.LOADING);

        return axios.post('/api/auth/sign-up', userData)
            .then(response => {
                dispatch(success(response.data));
                model.setState(MODEL_STATES.SUCCESS);

                return {
                    redirect: ROUTES.HOME
                };
            })
            .catch(error => {
                dispatch(failure(error));
                model.setState(MODEL_STATES.FAILURE);
            });
    }

    function request() { return { type: ACTIONS.SIGN_UP_REQUEST }; }
    function success(user) { return { type: ACTIONS.SIGN_UP_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.SIGN_UP_FAILURE, error }; }
}


export {
    getAuth,
    signUp
};