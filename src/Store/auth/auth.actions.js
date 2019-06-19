import { ACTIONS } from './auth.reducer';
import { ROUTES } from '../../Routes';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SOCKET_ACTIONS } from '../SocketMiddleware';
import { InvalidToken, AccountActivationSend, AccountActivationFailed,
        ResetPassword, ResetPasswordSuccess, ResetPasswordFailed,
        ResetPasswordTokenInvalid, SendResetPasswordEmailSuccess,
        SendResetPasswordEmailFailure, AccountActivationRequired,
        STATES as MODEL_STATES } from '../../Models';

/**
 *
 */
function socketSubscribe(dispatch) {

    const handlers = [
        ACTIONS.SYNC_AUTH_SUBSCRIBE_SUCCESS,
        ACTIONS.SYNC_AUTH_LOGOUT
    ].map( event => ([
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

function signUp({ setState, STATES, userData, history, clearForm }) {

    return function _signUp(dispatch) {

        setState(STATES.CREATING_ACCOUNT);
        dispatch(request());

        return axios.post('/api/auth/sign-up', userData)
            .then(response => {
                dispatch(success(response.data));
                setState(STATES.SIGN_UP_SUCCESS);
                history.push(ROUTES.HOME);
                clearForm();
            })
            .catch(error => {
                dispatch(failure(error));

                switch(error.response.status) {
                    case 409:
                        setState(STATES.DUPLICATE_ACCOUNT);
                        break;
                    default:
                        setState(STATES.SIGN_UP_FAILED);
                }
            });
    }

    function request() { return { type: ACTIONS.SIGN_UP_REQUEST }; }
    function success(user) { return { type: ACTIONS.SIGN_UP_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.SIGN_UP_FAILURE, error }; }
}

function signIn({ userData, setState, createModel, STATES, history, clearForm }) {

    return function _signIn(dispatch) {
        dispatch(request());
        setState(STATES.SIGNING_IN);

        axios.post('/api/auth/sign-in', userData)
            .then( ({data: user}) => {
                dispatch(success(user));
                // Subscribe to sync authentication actions.
                dispatch(syncAuthUpdate(user));
                setState(STATES.CLOSED);
                history.push(ROUTES.PROFILE);
            })
            .catch(error => {
                console.log(error);
                switch(error.response.status) {
                    case 403:
                        dispatch(failure(error));
                        createModel({
                            state: 'ACCOUNT_ACTIVATION_REQUIRED',
                            model: AccountActivationRequired,
                            actions: {
                                onSendVerificationEmail:() =>
                                    dispatch(sendEmailVerification({ userData, setState, createModel, STATES }))
                            }
                        });
                        setState('ACCOUNT_ACTIVATION_REQUIRED');
                        clearForm();
                        break;

                    default:
                        dispatch(failure(error.response.data));
                        setState(STATES.SIGN_IN_FAILED);
                }
            });
    };


    function request() { return { type: ACTIONS.SIGN_IN_REQUEST }; }
    function success(user) { return { type: ACTIONS.SIGN_IN_SUCCESS, user }; }
    function failure(error) { return { type: ACTIONS.SIGN_IN_FAILURE, error }; }
}


function signOut({ setState, STATES, history }) {
    return function _signOut(dispatch) {
        dispatch(request());

        setState(STATES.LOADING);

        return axios.get('/api/auth/sign-out')
            .then(response => {

                // Synchronize logout actions across multiply tabs
                dispatch({
                    type: SOCKET_ACTIONS.EMIT,
                    event: ACTIONS.SYNC_AUTH_LOGOUT
                });

                dispatch(success());
                history.push(ROUTES.HOME);
                // Get new authentication
                return dispatch(getAuth())
                    .then(() => {
                        setState(STATES.CLOSED);
                    });
            })
            .catch(error => {
                dispatch(failure(error));
                setState(STATES.CLOSED);
            });
    }

    function request() { return { type: ACTIONS.SIGN_OUT_REQUEST }; }
    function success() { return { type: ACTIONS.SIGN_OUT_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.SIGN_OUT_FAILURE, error }; }
}

function resetPassword({ token, pwd, state, setState, STATES }) {
    return function _resetPassword(dispatch) {
        dispatch(request());
        setState(STATES.LOADING);

        return axios.post('/api/auth/reset-password', { token, pwd })
            .then(response => {
                dispatch(success());
                    setState(STATES.RESET_PASSWORD_SUCCESS);
            })
            .catch(error => {
                dispatch(failure(error));
                setState(STATES.RESET_PASSWORD_FAILED);
            });
    }

    function request() { return { type: ACTIONS.RESET_PASSWORD_REQUEST }; }
    function success() { return { type: ACTIONS.RESET_PASSWORD_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.RESET_PASSWORD_FAILURE, error }; }
}

function changePassword({ pwd, newPwd, setState, STATES }) {
    return function _changePassword(dispatch) {
        dispatch(request(newPwd));
        setState(STATES.CHANGING_PASSWORD);

        return axios.post('/api/auth/change-password', {
                password: pwd,
                newPassword: newPwd
            }).then(response => {
                dispatch(success());
                setState(STATES.CHANGE_PASSWORD_SUCCESS);
            })
            .catch(error => {
                dispatch(failure(error));
                setState(STATES.CHANGE_PASSWORD_FAILED);
            });

    }
    function request() { return { type: ACTIONS.CHANGE_PASSWORD_REQUEST }; }
    function success() { return { type: ACTIONS.CHANGE_PASSWORD_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.CHANGE_PASSWORD_FAILURE, error}; }
}

function sendResetPasswordEmail({ userData, setState, state, createModel, STATES }) {

    return function _resetPassword(dispatch) {

        dispatch(request());
        setState(STATES.LOADING);

        createModel([{
            state: 'SEND_RESET_PASSWORD_SUCCESS',
            model: SendResetPasswordEmailSuccess
        },{
            state: 'SEND_RESET_PASSWORD_FAILURE',
            model: SendResetPasswordEmailFailure,
            actions: {
                onSendEmailVerification: () =>
                    dispatch(sendEmailVerification({ userData, setState, createModel, STATES }))
            }
        }]);

        return axios.post('/api/auth/reset-password-request', userData)
            .then(response => {
                dispatch(success());

                setState('SEND_RESET_PASSWORD_SUCCESS');
            })
            .catch(error => {
                dispatch(failure(error));

                setState('SEND_RESET_PASSWORD_FAILURE', { message: error.response.data });
            });
    };

    function request() { return { type: ACTIONS.SEND_RESET_PASSWORD_REQUEST }; }
    function success() { return { type: ACTIONS.SEND_RESET_PASSWORD_SUCCESS }; }
    function failure(error) { return { type: ACTIONS.SEND_RESET_PASSWORD_FAILURE, error }; }
}

function processQueryString({ params, userID, setState, createModel, STATES, path })
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
                return {
                    closeModel: true
                };
            }

            dispatch(request(type));

            if (type === TOKEN_TYPE.VERIFY_EMAIL) {
                return axios.post('/api/auth/validate-token', { token })
                    .then(response => {
                        if (response.status === 200) {
                            dispatch(success());
                            setState(STATES.ACCOUNT_ACTIVATED);

                            return {
                                closeModel: false
                            };
                        }

                        return {
                            closeModel: true,
                        };
                    })
                    .catch(error => {
                        dispatch(failure(error));
                        createModel({
                            state: 'INVALID_TOKEN_EMAIL_TOKEN',
                            model: InvalidToken,
                            actions: {
                                onSendEmailVerification: () =>
                                    dispatch(sendEmailVerification({
                                        userData: { id },
                                        setState,
                                        createModel,
                                        STATES })
                                    )
                            }
                        });

                        setState('INVALID_TOKEN_EMAIL_TOKEN');
                        return {
                            closeModel: false
                        };

                    });
            } else if (type === TOKEN_TYPE.RESET_PASSWORD) {
                dispatch(request(type));
                return axios.post('/api/auth/validate-token', { token })
                    .then(response => {

                        dispatch(success(response.data));

                        createModel([{
                            state: 'RESET_PASSWORD_FORM',
                            model: ResetPassword,
                            actions: {
                                onClose: ({ state, setState }) => {
                                    if (state !== 'RESET_PASSWORD_FORM') {
                                        setState(MODEL_STATES.CLOSED);
                                    }
                                },
                                onCancel: ({ state, setState}) => {
                                    setState(MODEL_STATES.CLOSED);
                                },
                                onResetPassword: ({ state, setState, STATES, pwd }) => {
                                    dispatch(resetPassword({ token, state, setState, createModel, STATES, pwd}));
                                }
                            }
                        },{
                            state: 'RESET_PASSWORD_SUCCESS',
                            model: ResetPasswordSuccess,
                            actions: {
                                onClose: ({state, setState, history }) => {
                                    setState(MODEL_STATES.CLOSED);
                                    history.push(ROUTES.SIGN_IN);
                                }
                            }
                        },{
                            state: 'RESET_PASSWORD_FAILED',
                            model: ResetPasswordFailed
                        }]);

                        setState('RESET_PASSWORD_FORM');
                    })
                    .catch(error => {

                        dispatch(failure(error));
                        createModel({
                            state: "RESET_PASSWORD_TOKEN_INVALID",
                            model: ResetPasswordTokenInvalid,
                            actions: {
                                onResend:({ setState, state, actions, STATES }) =>
                                    dispatch(sendResetPasswordEmail({ userData: { id}, setState, state, actions, STATES }))
                            }
                        });

                        setState('RESET_PASSWORD_TOKEN_INVALID');
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
                    dispatch(syncAuthUpdate(user));

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

function sendEmailVerification({ userData, setState, createModel, STATES }) {
    return function _sendEmailVerification(dispatch) {
        dispatch(request(userData));

        createModel([{
            state: 'ACCOUNT_ACTIVATION_SENT',
            model: AccountActivationSend,
            actions: {
                onSendEmailVerification: () =>
                    dispatch(sendEmailVerification({
                        userData,
                        setState,
                        createModel,
                        STATES })
                    )
            }
        },{
            state: 'ACCOUNT_ACTIVATION_FAILED',
            model: AccountActivationFailed,
            actions: {
                onSendEmailVerification: () =>
                    dispatch(sendEmailVerification({
                        userData,
                        setState,
                        createModel,
                        STATES })
                    )
            }
        }]);

        setState(MODEL_STATES.LOADING);

        return axios.post('/api/auth/validate-email', userData)
            .then(response => {
                dispatch(success(response));
                setState('ACCOUNT_ACTIVATION_SENT');
            })
            .catch(error => {
                dispatch(failure(error));
                setState('ACCOUNT_ACTIVATION_FAILED');
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