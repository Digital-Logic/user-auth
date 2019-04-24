const ACTIONS = Object.freeze({
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    GET_AUTH_REQUEST: 'GET_AUTH_REQUEST',
    GET_AUTH_SUCCESS: 'GET_AUTH_SUCCESS',
    GET_AUTH_FAILURE: 'GET_AUTH_FAILURE',
    SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
    SIGN_OUT_REQUEST: 'SIGN_OUT_REQUEST',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
    CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
    CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE',
    SEND_EMAIL_VALIDATION_REQUEST: 'SEND_EMAIL_VALIDATION_REQUEST',
    SEND_EMAIL_VALIDATION_SUCCESS: 'SEND_EMAIL_VALIDATION_SUCCESS',
    SEND_EMAIL_VALIDATION_FAILURE: 'SEND_EMAIL_VALIDATION_FAILURE',
    SEND_RESET_PASSWORD_EMAIL_REQUEST: 'SEND_RESET_PASSWORD_EMAIL_REQUEST',
    SEND_RESET_PASSWORD_EMAIL_SUCCESS: 'SEND_RESET_PASSWORD_EMAIL_SUCCESS',
    SEND_RESET_PASSWORD_EMAIL_FAILURE: 'SEND_RESET_PASSWORD_EMAIL_FAILURE',
    PROCESS_TOKEN_REQUEST: 'PROCESS_TOKEN_REQUEST',
    PROCESS_TOKEN_SUCCESS: 'PROCESS_TOKEN_SUCCESS',
    PROCESS_TOKEN_FAILURE: 'PROCESS_TOKEN_FAILURE',
    RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE'
});


const initialState = {
    isAuthenticated: false,
    isAuthenticating: true,
    id: null,
    rules: null
};

function reducer(state=initialState, { type, user, error }) {
    switch(type) {
        case ACTIONS.LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticating: true
            };
        case ACTIONS.GET_AUTH_SUCCESS:
        case ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                id: user.id,
                rules: user.rules,
                isAuthenticated: Boolean(user.id),
                isAuthenticating: false
            };

        case ACTIONS.SIGN_OUT_SUCCESS:
        case ACTIONS.SIGN_OUT_FAILURE:
            return initialState;

        case ACTIONS.GET_AUTH_FAILURE:
        case ACTIONS.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                isAuthenticating: false,
                id: null,
                rules: null
            };

        default:
            return state;
    }
}

export {
    reducer,
    ACTIONS
};