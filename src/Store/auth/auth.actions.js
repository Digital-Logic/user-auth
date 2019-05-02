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
                    clearForm: true
                };
            })
            .catch(error => {
                dispatch(failure(error));

                switch(error.response.status) {
                    case 409:
                        model.setState(MODEL_STATES.DUPLICATE_ACCOUNT);
                        break;
                    default:
                        model.setMessage(error.response.data || "Unknown error occurred");
                        model.setState(MODEL_STATES.FAILURE);
                }
            });
    }

    function request() { return { type: ACTIONS.SIGN_UP_REQUEST }; }
    function success(user) { return { type: ACTIONS.SIGN_UP_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.SIGN_UP_FAILURE, error }; }
}

function signIn({ model, userData }) {

    return function _signIn(dispatch) {
        dispatch(request());
        model.setState(MODEL_STATES.LOADING);

        return axios.post('/api/auth/sign-in', userData)
            .then(response => {
                dispatch(success(response.data));
                model.setState(MODEL_STATES.CLOSED);


                return {
                    clearForm: true,
                    redirect: ROUTES.PROFILE
                };
            })
            .catch(error => {

                switch(error.response.status) {

                    case 403:
                        dispatch(failure(error));
                        model.setState(MODEL_STATES.ACCOUNT_ACTIVATION_REQUIRED);
                        break;

                    default:
                        dispatch(failure(error));
                        model.setState(MODEL_STATES.FAILURE);
                        model.setMessage(typeof error.response.data === 'string' ?
                            error.response.data : JSON.stringify(error.response.data));
                }
            });
    };


    function request() { return { type: ACTIONS.SIGN_IN_REQUEST }; }
    function success(user) { return { type: ACTIONS.SIGN_IN_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.SIGN_IN_FAILURE, error }; }
}


export {
    getAuth,
    signUp,
    signIn
};