
const ACTIONS = Object.freeze({
    GET_AUTH_REQUEST: 'GET_AUTH_REQUEST',
    GET_AUTH_SUCCESS: 'GET_AUTH_SUCCESS',
    GET_AUTH_FAILURE: 'GET_AUTH_FAILURE',
    SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
    SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
    SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
    SIGN_OUT_REQUEST: 'SIGN_OUT_REQUEST',
    SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
    PROCESS_QUERY_TOKEN_REQUEST: 'PROCESS_QUERY_TOKEN_REQUEST',
    PROCESS_QUERY_TOKEN_SUCCESS: 'PROCESS_QUERY_TOKEN_SUCCESS',
    PROCESS_QUERY_TOKEN_FAILURE: 'PROCESS_QUERY_TOKEN_FAILURE',
    SEND_EMAIL_VERIFICATION_REQUEST: "SEND_EMAIL_VERIFICATION_REQUEST",
    SEND_EMAIL_VERIFICATION_SUCCESS: 'SEND_EMAIL_VERIFICATION_SUCCESS',
    SEND_EMAIL_VERIFICATION_FAILURE: 'SEND_EMAIL_VERIFICATION_FAILURE'
});

const initialState = {
    isAuthenticating: false,
    isAuthenticated: false,
    id: null,
    rules: []
};

function reducer(state=initialState, { type, user }) {
    switch(type) {
        case ACTIONS.GET_AUTH_REQUEST:
            return {
                ...state,
                isAuthenticating: true
            };

        case ACTIONS.SIGN_IN_FAILURE:
        case ACTIONS.GET_AUTH_FAILURE:
            return initialState;

        case ACTIONS.SIGN_IN_SUCCESS:
        case ACTIONS.GET_AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticated: Boolean(user.id),
                isAuthenticating: false,
                id: user.id,
                rules: user.rules
            }

        default:
            return state;
    }
}


export {
    reducer as authReducer,
    ACTIONS
};