import { ACTIONS } from './auth.reducer';
import { STATES as MODEL_STATES } from '../../Models';
import { ROUTES } from '../../Routes';
import axios from 'axios';
import jwt from 'jsonwebtoken';


function getAuth() {

    return function _getAuth(dispatch) {
        dispatch(request());

        return axios.get('/api/auth/sign-in')
            .then(response => {
                dispatch(success(response.data));
            })
            .catch(error => {
                dispatch(failure(error));
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
                        model.setErrorMessage(error.response.data || "Unknown error occurred");
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
                        model.setErrorMessage(typeof error.response.data === 'string' ?
                            error.response.data : JSON.stringify(error.response.data));
                }
            });
    };


    function request() { return { type: ACTIONS.SIGN_IN_REQUEST }; }
    function success(user) { return { type: ACTIONS.SIGN_IN_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.SIGN_IN_FAILURE, error }; }
}


function signOut({ model }) {
    return function _signOut(dispatch) {
        dispatch(request());

        model.setState(MODEL_STATES.LOADING);
        model.setContent({
            [MODEL_STATES.LOADING]: {
                title: 'Logging out'
            }
        });

        return axios.get('/api/auth/sign-out')
            .then(response => {
                dispatch(success());
                // Get new authentication
                dispatch(getAuth())
                    .then(() => {
                        model.setState(MODEL_STATES.CLOSED);
                    });
            })
            .catch(error => {
                dispatch(failure(error));
                model.setState(MODEL_STATES.CLOSED);
            });
    }

    function request() { return { type: ACTIONS.SIGN_OUT_REQUEST }; }
    function success() { return { type: ACTIONS.SIGN_OUT_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.SIGN_OUT_FAILURE }; }
}

function sendResetPasswordEmail({ userData, model }) {

    return function _resetPassword(dispatch) {

        dispatch(request());
        model.setState(MODEL_STATES.LOADING);

        return axios.post('/api/auth/reset-password-request', userData)
            .then(response => {
                dispatch(success());
                model.setState(MODEL_STATES.SUCCESS);
            })
            .catch(error => {
                dispatch(failure(error));
                model.setState(MODEL_STATES.FAILURE);
                model.setErrorMessage(typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data));
            });
    };

    function request() { return { type: ACTIONS.RESET_PASSWORD_REQUEST }; }
    function success() { return { type: ACTIONS.RESET_PASSWORD_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.RESET_PASSWORD_FAILURE, error }; }
}

function processQueryStringToken({ token, id: userID, model })
{
    const TOKEN_TYPE = Object.freeze({
        VERIFY_EMAIL: "VERIFY_EMAIL",
        RESET_PASSWORD: "RESET_PASSWORD"
    });

    return function _processQueryStringToken (dispatch) {

        // If we do not receive a token to process, return and close the model
        if (!token)
            return { closeModel: true };

        const { type, id } = jwt.decode(token);

        // Check if the current user's id is the same as the,
        // userID in the jwt token, if it is ignore the request
        if (userID && userID === id) {
            return;
        }

        dispatch(request(type));

        if (type === TOKEN_TYPE.VERIFY_EMAIL) {
            return axios.post('/api/auth/validate-token', { token })
                .then(response => {

                    if (response.status === 200) {
                        dispatch(success());
                        model.setState(MODEL_STATES.ACCOUNT_ACTIVATED);
                    }

                    return {
                        closeModel: true,
                    };
                })
                .catch(error => {
                    dispatch(failure(error));
                    model.setState(MODEL_STATES.ACCOUNT_ACTIVATION_TOKEN_INVALID);
                });
        }

    }

    function request(tokenType) { return { type: ACTIONS.PROCESS_QUERY_TOKEN_REQUEST, tokenType }; }
    function success() { return { type: ACTIONS.PROCESS_QUERY_TOKEN_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.PROCESS_QUERY_TOKEN_FAILURE, error }; }
}

function sendEmailVerification({ userData, model }) {
    return function _sendEmailVerification(dispatch) {
        dispatch(request(userData));

        model.setState(MODEL_STATES.LOADING);

        return axios.post('/api/auth/validate-email', userData)
            .then(response => {
                dispatch(success(response));
                model.setState(MODEL_STATES.ACCOUNT_ACTIVATION_SEND);

                return {
                    clearForm: true
                };
            })
            .catch(error => {
                dispatch(failure(error));
                model.setState(MODEL_STATES.ACCOUNT_ACTIVATION_FAILURE);
            });
    }

    function request(user) { return { type: ACTIONS.SEND_EMAIL_VERIFICATION_REQUEST, user }; }
    function success(response) { return { type: ACTIONS.SEND_EMAIL_VERIFICATION_SUCCESS, response }; }
    function failure(error) { return { type: ACTIONS.SEND_EMAIL_VERIFICATION_FAILURE, error }; }
}


export {
    getAuth,
    signUp,
    signIn,
    signOut,
    sendResetPasswordEmail,
    processQueryStringToken,
    sendEmailVerification
};