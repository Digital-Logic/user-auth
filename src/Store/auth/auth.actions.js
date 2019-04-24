import { ACTIONS } from './index';
import { modelActions, MODEL_STATES } from '../models';
import { GLOBAL_ACTIONS } from '../util';
import axios from 'axios';
import { reset } from 'redux-form';
import jwt from 'jsonwebtoken';
import { ROUTES } from '../../Routes';

function getAuth() {
    return function _getAuth(dispatch) {

        dispatch(request());
        const model = dispatch(modelActions.createLoadingModel());
        return axios.get('/api/auth/sign-in')
            .then(response => {
                dispatch(modelActions.destroyModel(model));
                return dispatch(success(response.data));
            })
            .catch(err => {
                dispatch(modelActions.destroyModel(model));
                return dispatch(failure(err));
            });
    }
    function request() { return { type: ACTIONS.GET_AUTH_REQUEST };}
    function success(user) { return { type: ACTIONS.GET_AUTH_SUCCESS, user };}
    function failure(error) { return { type: ACTIONS.GET_AUTH_FAILURE, error };}
}

function signIn(user) {
    return function _login(dispatch) {

        dispatch(request(user));

        const model = dispatch(modelActions.createLoadingModel({
            title: "Logging In"
        }));

        return axios.post('/api/auth/sign-in', user)
            .then(response => {
                dispatch(success(response.data));
                dispatch(modelActions.destroyModel(model));
            })
            .catch(err => {
                dispatch(failure(err.response));
                switch(err.response.status) {
                    case 401:
                        return dispatch(modelActions.updateModel({
                            ...model,
                            state: MODEL_STATES.FAILURE,
                            message: err.response.data || "Invalid username or password",
                            title: "Authentication Failed"
                        }));
                    case 403:
                        return dispatch(modelActions.updateModel({
                            ...model,
                            state: MODEL_STATES.FAILURE_ACCOUNT_ACTIVATION,
                            message: "Please check your email for an activation email.",
                            title: 'Account Activation Required',
                            actions: {
                                sendActivation: {
                                    email: user.email
                                }
                            }
                        }));
                    default:
                        return dispatch(modelActions.updateModel({
                            ...model,
                            state: MODEL_STATES.FAILURE,
                            message: err.response.data || "Unknown error occurred.",
                            title: "Authentication Error"
                        }));
                }
            });
    }

    function request(user) { return { type: ACTIONS.LOGIN_REQUEST,  user }; }
    function success(user) { return { type: ACTIONS.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.LOGIN_FAILURE, error }; }
}

function changePassword({ data, user, model }) {

    return function _changePassword(dispatch) {

        dispatch(request(user));

        if (model) {
            dispatch(modelActions.updateModel({
                ...model,
                state: MODEL_STATES.LOADING,
                title: "Changing Password"
            }));
        }

        return axios.post('/api/auth/change-password', {
                ...data,
                ...user
            })
            .then(response => {
                dispatch(success(response));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.SUCCESS,
                    title: "Password Changed",
                    message: "Your password was successful updated."
                }));
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.FAILURE,
                    title: "Failure",
                    message: "Failure to update password"
                }));
            });
    };

    function request(user) { return { type: ACTIONS.CHANGE_PASSWORD_REQUEST, user };}
    function success(user) { return { type: ACTIONS.CHANGE_PASSWORD_SUCCESS, user };}
    function failure(error) { return { type: ACTIONS.CHANGE_PASSWORD_FAILURE, error };}
}

function signOut() {
    return function _signOut(dispatch) {
        const model = dispatch(modelActions.createLoadingModel({ title: 'Signing Out'}));
        dispatch(request());

        return axios.get('/api/auth/sign-out')
            .then(response => {
                dispatch(modelActions.destroyModel(model));
                dispatch(success());

                // Get the new user permissions from server
                return dispatch(getAuth());
            })
            .then(response => {
                // Purge all data that the new user should not have access to.
                dispatch(purgeData(response.user));
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(modelActions.updateModel({
                    title: "Sign-out Failure",
                    message: error.message,
                    state: MODEL_STATES.FAILURE
                }));
            });
    }
    function request() { return { type: ACTIONS.SIGN_OUT_REQUEST }; }
    function success() { return { type: ACTIONS.SIGN_OUT_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.SIGN_OUT_FAILURE, error }; }
}

function purgeData(user) {
    return {
        type: GLOBAL_ACTIONS.PURGE_DATA,
        rules: user.rules
    };
}

function signUp(userData) {
    return function _signUp(dispatch) {
        // create loader
        const model = dispatch(modelActions.createLoadingModel({ title: "Creating Account" }));
        dispatch(request(userData));
        return axios.post('/api/auth/sign-up', userData )
            .then(response => {
                dispatch(success(response.data));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.SUCCESS,
                    title: 'Account Created',
                    message: 'Please check your email to activate your account.'
                }));
                return {
                    redirect: ROUTES.HOME
                };
            })
            .catch(error => {
                dispatch(failure(error));

                switch(error.response.status) {
                    case 409:
                        dispatch(modelActions.updateModel({
                            ...model,
                            state: MODEL_STATES.FAILURE_DUPLICATE_EMAIL
                        }));
                        dispatch(reset('signUp'));
                        break;

                    default:
                        dispatch(modelActions.updateModel({
                            ...model,
                            state: MODEL_STATES.FAILURE,
                            title: 'Error',
                            message: typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : error.response.data
                        }));
                }
            });
    };

    function request(user) { return { type: ACTIONS.SIGN_UP_REQUEST, user }; }
    function success(user) { return { type: ACTIONS.SIGN_UP_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.SIGN_UP_FAILURE, error }; }
}

function sendResetPasswordEmail(userData) {
    return function _sendResetPasswordEmail(dispatch) {
        dispatch(request());
        const model = dispatch(modelActions.createLoadingModel({
            title: "Requesting Password Reset"
        }));

        return axios.post('/api/auth/reset-password-request', userData )
            .then(response => {
                dispatch(success(response));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.SUCCESS,
                    title: 'Password Reset Sent',
                    message: 'An email has been sent to your account, which will allow you to reset your password.'
                }));
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.FAILURE,
                    title: 'Error Resetting Password',
                    message: error.response.data
                }));
            });

    }

    function request() { return { type: ACTIONS.SEND_RESET_PASSWORD_EMAIL_REQUEST }; }
    function success() { return { type: ACTIONS.SEND_RESET_PASSWORD_EMAIL_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.SEND_RESET_PASSWORD_EMAIL_FAILURE, error }; }
}




function sendEmailValidation(userData) {
    return function _sendEmailValidation(dispatch) {

        // Dispatch loading model
        const model = dispatch(modelActions.createLoadingModel());

        dispatch(request());

        return axios.post('/api/auth/validate-email', userData)
            .then(response => {
                dispatch(success(response.data));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.SUCCESS,
                    title: 'Email Validation Sent',
                    message: 'Please check for a validation email in your inbox.'
                }));
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.FAILURE,
                    title: 'Failure Sending Email',
                    message: 'A failure occurred while attempting to send a validation email. Please contact customer support.'
                }));
            });
    };

    function request(user) { return { type: ACTIONS.SEND_EMAIL_VALIDATION_REQUEST, user }; }
    function success(user) { return { type: ACTIONS.SEND_EMAIL_VALIDATION_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.SEND_EMAIL_VALIDATION_FAILURE, error }; }
}

function resetPassword({ data, model, token }) {
    return function _resetPassword(dispatch) {

        dispatch(request());
        dispatch(modelActions.updateModel({
            ...model,
            state: MODEL_STATES.LOADING,
            title: 'Resetting Password'
        }));

        return axios.post('/api/auth/reset-password', { token, pwd: data.pwd })
            .then(response => {
                dispatch(success());
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.SUCCESS,
                    title: 'Password Reset',
                    message: 'Your password was reset successfully, you may now login with it.'
                }));
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(modelActions.updateModel({
                    ...model,
                    state: MODEL_STATES.FAILURE,
                    title: 'Error Setting Password',
                    message: error.message
                }));
            });


    }
    function request() { return { type: ACTIONS.RESET_PASSWORD_REQUEST }; }
    function success() { return { type: ACTIONS.RESET_PASSWORD_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.RESET_PASSWORD_FAILURE, error }; }
}

function processQueryStringToken({ token, id: userID }) {

    const TOKEN_TYPE = Object.freeze({
        VERIFY_EMAIL: "VERIFY_EMAIL",
        RESET_PASSWORD: 'RESET_PASSWORD'
    });

    return function (dispatch) {
        // decode token
        const { type, id } = jwt.decode(token);

        // Is the user already activated and logged in
        if (userID && userID === id) {
            return Promise.resolve();
        }

        dispatch(request(type));

        if (type === TOKEN_TYPE.VERIFY_EMAIL) {

            const model = dispatch(modelActions.createLoadingModel());
            return axios.post('/api/auth/validate-token', { token })
                .then(response => {

                    if (response.status === 200) {
                        dispatch(modelActions.updateModel({
                            ...model,
                            state: MODEL_STATES.SUCCESS,
                            title: 'Account Verified',
                            message: 'Your account has been activated.',
                        }));

                        return { redirect: ROUTES.SIGN_IN };
                    } else {
                        dispatch(modelActions.destroyModel(model));
                    }

                    return dispatch(success());
                })
                .catch(error => {
                    dispatch(modelActions.updateModel({
                        ...model,
                        state: MODEL_STATES.FAILURE,
                        title: 'Account Verification Failed',
                        message: error.response.data
                    }));
                    dispatch(failure(error));
                });


        } else if (type === TOKEN_TYPE.RESET_PASSWORD) {

            dispatch(request());
            const model = dispatch(modelActions.createRestPasswordModel({
                title: 'Sending Reset Code',
                token
            }));

            // Validated the token within the query string,
            // ResetPasswordForm will call the resetPassword authAction creator
            return axios.post('/api/auth/validate-token', { token } )
                .then(response => {
                    dispatch(success());
                    dispatch(modelActions.updateModel({
                        ...model,
                        state: MODEL_STATES.OPEN,
                        title: "Reset Password"
                    }));
                })
                .catch(error => {
                    dispatch(failure(error));
                    dispatch(modelActions.updateModel({
                        ...model,
                        state: MODEL_STATES.FAILURE,
                        title: 'Error',
                        message: error.response.data
                    }));
                });
        }
    };

    function request() { return { type: ACTIONS.PROCESS_TOKEN_REQUEST }; }
    function success() { return { type: ACTIONS.PROCESS_TOKEN_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.PROCESS_TOKEN_FAILURE, error }; }
}

export {
    signIn,
    signUp,
    signOut,
    getAuth,
    sendEmailValidation,
    sendResetPasswordEmail,
    resetPassword,
    processQueryStringToken,
    changePassword
};