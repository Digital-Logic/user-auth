import * as modelActions  from './models.actions';

const MODEL_STATES = Object.freeze({
    OPEN: 'OPEN',
    SENDING: 'SENDING',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    FAILURE_ACCOUNT_ACTIVATION: 'FAILURE_ACCOUNT_ACTIVATION',
    FAILURE_DUPLICATE_EMAIL: 'FAILURE_DUPLICATE_EMAIL',
});

const MODEL_TYPES = Object.freeze({
    LOADING: 'LOADING',
    CONFORM: 'CONFORM',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    RESET_PASSWORD: 'RESET_PASSWORD'
});


export {
    MODEL_STATES,
    MODEL_TYPES,
    modelActions
};

export { reducer as modelReducer } from './models.reducer';