import { reducer } from 'redux-form';
import { ACTIONS as AUTH_ACTIONS } from './auth';

const formReducer = reducer.plugin({
    signIn: (state, { type }) => {
        switch(type) {
            case AUTH_ACTIONS.LOGIN_SUCCESS:
                return null;
            default:
                return state;
        }
    },
    signUp: (state, { type }) => {
        switch(type) {
            case AUTH_ACTIONS.SIGN_UP_SUCCESS:
                return null;
            default:
                return state;
        }
    }
});

export default formReducer;