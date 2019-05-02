
const ACTIONS = Object.freeze({
    GET_AUTH_REQUEST: 'GET_AUTH_REQUEST',
    GET_AUTH_SUCCESS: 'GET_AUTH_SUCCESS',
    GET_AUTH_FAILURE: 'GET_AUTH_FAILURE',
    SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE'
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

        case ACTIONS.GET_AUTH_FAILURE:
            return initialState;

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