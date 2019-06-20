const ACTIONS = Object.freeze({
    GET_AUTH_REQUEST: 'GET_AUTH_REQUEST',
    GET_AUTH_SUCCESS: 'GET_AUTH_SUCCESS',
    GET_AUTH_FAILURE: 'GET_AUTH_FAILURE',
    SYNC_AUTH_SUBSCRIBE: 'SYNC_AUTH_SUBSCRIBE',
    SYNC_AUTH_SUBSCRIBE_SUCCESS: 'SYNC_AUTH_SUBSCRIBE_SUCCESS',
    SYNC_AUTH_LOGOUT: 'SYNC_AUTH_LOGOUT',
    SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
    SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
    SIGN_IN_OAUTH_REQUEST: 'SIGN_IN_OAUTH_REQUEST',
    SIGN_IN_OAUTH_SUCCESS: 'SIGN_IN_OAUTH_SUCCESS',
    SIGN_IN_OAUTH_FAILURE: 'SIGN_IN_OAUTH_FAILURE',
    SIGN_OUT_REQUEST: 'SIGN_OUT_REQUEST',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
    PROCESS_QUERY_TOKEN_REQUEST: 'PROCESS_QUERY_TOKEN_REQUEST',
    PROCESS_QUERY_TOKEN_SUCCESS: 'PROCESS_QUERY_TOKEN_SUCCESS',
    PROCESS_QUERY_TOKEN_FAILURE: 'PROCESS_QUERY_TOKEN_FAILURE',
    SEND_EMAIL_VERIFICATION_REQUEST: "SEND_EMAIL_VERIFICATION_REQUEST",
    SEND_EMAIL_VERIFICATION_SUCCESS: 'SEND_EMAIL_VERIFICATION_SUCCESS',
    SEND_EMAIL_VERIFICATION_FAILURE: 'SEND_EMAIL_VERIFICATION_FAILURE',
    SEND_RESET_PASSWORD_REQUEST: 'SEND_RESET_PASSWORD_REQUEST',
    SEND_RESET_PASSWORD_SUCCESS: 'SEND_RESET_PASSWORD_SUCCESS',
    SEND_RESET_PASSWORD_FAILURE: 'SEND_RESET_PASSWORD_FAILURE',
    RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',
    CHANGE_PASSWORD_REQUEST: 'CHANGE_PASSWORD_REQUEST',
    CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
    CHANGE_PASSWORD_FAILURE: 'CHANGE_PASSWORD_FAILURE'
});

const initialState = {
    isAuthenticating: true,
    isAuthenticated: false,
    id: null,
    accessToken: null,
    refreshToken: null,
    rules: [{
        actions: 'read',
        subject: ['User'],
        fields: ['firstName', 'lastName', '_id']
    }]
};

function reducer(state=initialState, { type, user }) {
    switch(type) {
        case ACTIONS.SIGN_OUT_REQUEST:
            return initialState;

        case ACTIONS.GET_AUTH_REQUEST:
            return {
                ...state,
                isAuthenticating: true
            };

        case ACTIONS.SIGN_IN_FAILURE:
        case ACTIONS.GET_AUTH_FAILURE:
            return {
                ...initialState,
                isAuthenticating: false
            };

        case ACTIONS.SIGN_IN_SUCCESS:
        case ACTIONS.SIGN_IN_OAUTH_SUCCESS:
        case ACTIONS.GET_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: Boolean(user.id),
                isAuthenticating: false,
                id: user.id,
                accessToken: user.tokens.access,
                refreshToken: user.tokens.refresh,
                rules: user.rules
            };

        case `RECEIVE: ${ACTIONS.SYNC_AUTH_LOGOUT}`:
            return {
                ...initialState,
                isAuthenticating: false
            };

        default:
            return state;
    }
}

const DEFAULT_RULES = initialState.rules;

export {
    reducer as authReducer,
    ACTIONS,
    DEFAULT_RULES
};