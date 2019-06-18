import { ACTIONS } from './auth.reducer';
import { STATES as MODEL_STATES } from '../../Models';
import { ROUTES } from '../../Routes';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SOCKET_ACTIONS } from '../SocketMiddleware';

/**
 *
 */
function socketSubscribe(dispatch) {

    const handlers = [ACTIONS.SYNC_AUTH_SUBSCRIBE_SUCCESS,
        ACTIONS.SYNC_AUTH_LOGOUT].map( event => ([
        event,
        dispatch({
            type: SOCKET_ACTIONS.SUBSCRIBE,
            event
        })
    ]));

    return () => {
        handlers.forEach(
            ([event, handle]) =>
                dispatch({
                    type: SOCKET_ACTIONS.UNSUBSCRIBE,
                    event,
                    handle
                })
        );
    }
}

function syncAuthUpdate(user) {
    return dispatch =>{
        dispatch({
            type: SOCKET_ACTIONS.EMIT,
            event: ACTIONS.SYNC_AUTH_SUBSCRIBE,
            data: {
                id: user.id,
                token: user.tokens.refresh
            }
        });
    }
}


function getAuth() {
    return function _getAuth(dispatch) {
        dispatch(request());
        return axios.get('/api/auth/sign-in')
            .then(({ data: user }) => {
                dispatch(success(user));
                dispatch(syncAuthUpdate(user));
                return user;
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
        model.actions.setState(MODEL_STATES.SIGN_OUT);

        return axios.post('/api/auth/sign-up', userData)
            .then(response => {
                dispatch(success(response.data));
                model.actions.setState(MODEL_STATES.SUCCESS);

                return {
                    clearForm: true
                };
            })
            .catch(error => {
                dispatch(failure(error));

                switch(error.response.status) {
                    case 409:
                        model.actions.setState(MODEL_STATES.DUPLICATE_ACCOUNT);
                        break;
                    default:
                        //model.setErrorMessage(error.response.data || "Unknown error occurred");
                        model.actions.setState(MODEL_STATES.FAILURE);
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
        model.actions.setState(MODEL_STATES.LOADING);

        return axios.post('/api/auth/sign-in', userData)
            .then( ({data: user}) => {
                dispatch(success(user));
                // Subscribe to sync authentication actions.
                dispatch(syncAuthUpdate(user));
                model.actions.setState(MODEL_STATES.CLOSED);

                return {
                    redirect: ROUTES.PROFILE
                };
            })
            .catch(error => {
                console.log(error);
                switch(error.response.status) {

                    case 403:
                        dispatch(failure(error));
                        model.actions.setState(MODEL_STATES.ACCOUNT_ACTIVATION_REQUIRED);
                        break;

                    default:
                        dispatch(failure(error));
                        model.actions.setState(MODEL_STATES.FAILURE);
                        // model.setErrorMessage(typeof error.response.data === 'string' ?
                        //     error.response.data : JSON.stringify(error.response.data));
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

        model.actions.setState(MODEL_STATES.SIGN_OUT);


        return axios.get('/api/auth/sign-out')
            .then(response => {

                // Synchronize logout actions across multiply tabs
                dispatch({
                    type: SOCKET_ACTIONS.EMIT,
                    event: ACTIONS.SYNC_AUTH_LOGOUT
                });

                dispatch(success());

                model.actions.redirect(ROUTES.HOME);
                // Get new authentication
                return dispatch(getAuth())
                    .then(() => {
                        model.actions.setState(MODEL_STATES.CLOSED);
                    });
            })
            .catch(error => {
                dispatch(failure(error));
                model.actions.setState(MODEL_STATES.CLOSED);
            });
    }

    function request() { return { type: ACTIONS.SIGN_OUT_REQUEST }; }
    function success() { return { type: ACTIONS.SIGN_OUT_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.SIGN_OUT_FAILURE, error }; }
}

function resetPassword({ token, pwd, model }) {
    return function _resetPassword(dispatch) {
        dispatch(request());
        model.actions.setState(MODEL_STATES.LOADING);

        return axios.post('/api/auth/reset-password', { token, pwd })
            .then(response => {
                dispatch(success());
                model.actions.setState(MODEL_STATES.RESET_PASSWORD_SUCCESS);
                model.actions.redirect(ROUTES.SIGN_IN);
            })
            .catch(error => {
                dispatch(failure(error));
                model.actions.setState(MODEL_STATES.RESET_PASSWORD_FAILURE);
            });
    }

    function request() { return { type: ACTIONS.RESET_PASSWORD_REQUEST }; }
    function success() { return { type: ACTIONS.RESET_PASSWORD_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.RESET_PASSWORD_FAILURE, error }; }
}

function changePassword({ pwd, newPwd, model }) {
    return function _changePassword(dispatch) {
        dispatch(request(newPwd));
        model.actions.setState(MODEL_STATES.CHANGE_PASSWORDS_LOADING);

        return axios.post('/api/auth/change-password', {
                password: pwd,
                newPassword: newPwd
            }).then(response => {
                dispatch(success());
                model.actions.setState(MODEL_STATES.CHANGE_PASSWORDS_SUCCESS);
            })
            .catch(error => {
                dispatch(failure(error));
                model.actions.setState(MODEL_STATES.CHANGE_PASSWORDS_FAILURE);
            });

    }
    function request() { return { type: ACTIONS.CHANGE_PASSWORD_REQUEST }; }
    function success() { return { type: ACTIONS.CHANGE_PASSWORD_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.CHANGE_PASSWORD_FAILURE, error}; }
}

function sendResetPasswordEmail({ userData, model }) {

    return function _resetPassword(dispatch) {

        dispatch(request());
        model.actions.setState(MODEL_STATES.LOADING);

        return axios.post('/api/auth/reset-password-request', userData)
            .then(response => {
                dispatch(success());
                model.actions.setState(MODEL_STATES.SEND_RESET_PASSWORD_SUCCESS);
            })
            .catch(error => {
                dispatch(failure(error));

                model.actions.createActions({
                    onSendEmailVerification: () =>
                            dispatch(sendEmailVerification({ userData, model }))
                });

                model.actions.setMessage({
                    [MODEL_STATES.RESET_PASSWORD_FAILURE]: typeof error.response.data === 'string' ? error.response.data :
                        JSON.stringify(error.response.data)
                });

                model.actions.setState(MODEL_STATES.RESET_PASSWORD_FAILURE);
            });
    };

    function request() { return { type: ACTIONS.SEND_RESET_PASSWORD_REQUEST }; }
    function success() { return { type: ACTIONS.SEND_RESET_PASSWORD_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.SEND_RESET_PASSWORD_FAILURE, error }; }
}

function processQueryString({ params, userID, model, path })
{
    const TOKEN_TYPE = Object.freeze({
        VERIFY_EMAIL: "VERIFY_EMAIL",
        RESET_PASSWORD: "RESET_PASSWORD",
        GOOGLE_AUTH: 'GOOGLE_AUTH'
    });

    return function _processQueryString (dispatch) {
        const { token, code } = params;

        // Process JWT token in query string
        if (token)
        {
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
                            model.actions.setState(MODEL_STATES.ACCOUNT_ACTIVATED);
                        }

                        return {
                            closeModel: false,
                        };
                    })
                    .catch(error => {
                        dispatch(failure(error));
                        model.actions.createActions({
                            onSendEmailVerification: () =>
                                dispatch(sendEmailVerification({ userData: { id }, model }))
                        });

                        model.actions.setState(MODEL_STATES.ACCOUNT_ACTIVATION_TOKEN_INVALID);

                        return {
                            closeModel: false
                        };

                    });
            } else if (type === TOKEN_TYPE.RESET_PASSWORD) {
                dispatch(request(type));
                return axios.post('/api/auth/validate-token', { token })
                    .then(response => {
                        dispatch(success());

                        model.actions.createActions({
                            onResetPassword: ({ model, pwd }) => {
                                dispatch(resetPassword({ model, token, pwd }))
                            }
                        });

                        model.actions.setState(MODEL_STATES.RESET_PASSWORD);
                    })
                    .catch(error => {
                        dispatch(failure(error));
                        model.actions.createActions({
                            sendResetPassword: () => {
                                dispatch(sendResetPasswordEmail({ userData: { id }, model }))
                            }
                        });
                        model.actions.setState(MODEL_STATES.RESET_PASSWORD_TOKEN_INVALID);
                    });
            }

            function request(tokenType) { return { type: ACTIONS.PROCESS_QUERY_TOKEN_REQUEST, tokenType }; }
            function success() { return { type: ACTIONS.PROCESS_QUERY_TOKEN_SUCCESS }; }
            function failure(error) { return { type: ACTIONS.PROCESS_QUERY_TOKEN_FAILURE, error }; }

            // Process OAuth authentication code in query string
        } else if (code) {

            dispatch(request(code));

            return axios.post('/api/auth/oauth2', {
                    code,
                    path
                })
                .then(({ data: user }) => {
                    dispatch(success(user));
                    // subscribe to Socket.io auth synchronization
                   // dispatch(syncAuthSessions(user.accessToken.token));
                    return {
                        closeModel: true,
                        redirect: ROUTES.PROFILE
                    };
                })
                .catch(error => {
                    dispatch(failure(error));
                });

            function request(code) { return { type: ACTIONS.SIGN_IN_OAUTH_REQUEST, code }; }
            function success(user) { return { type: ACTIONS.SIGN_IN_OAUTH_SUCCESS, user }; }
            function failure(error) { return { type: ACTIONS.SIGN_IN_OAUTH_FAILURE, error }; }
        } else {
            // Close the model
            return {
                closeModel: true
            };
        }
    }
}

function sendEmailVerification({ userData, model }) {
    return function _sendEmailVerification(dispatch) {
        dispatch(request(userData));

        model.actions.setState(MODEL_STATES.LOADING);

        return axios.post('/api/auth/validate-email', userData)
            .then(response => {
                dispatch(success(response));
                model.actions.setState(MODEL_STATES.ACCOUNT_ACTIVATION_SEND);

                return {
                    clearForm: true
                };
            })
            .catch(error => {
                dispatch(failure(error));
                model.actions.setState(MODEL_STATES.ACCOUNT_ACTIVATION_FAILURE);
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
    resetPassword,
    changePassword,
    sendResetPasswordEmail,
    processQueryString,
    sendEmailVerification,
    socketSubscribe
};