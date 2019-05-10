import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import { ACTIONS } from '../Store/auth/auth.reducer';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const STATES = Object.freeze({
    ...ACTIONS,
    CLOSED: 'CLOSED',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
    SIGN_OUT: 'SIGN_OUT',
    ACCOUNT_ACTIVATED: 'ACCOUNT_ACTIVATED',
    DUPLICATE_ACCOUNT: 'DUPLICATE_ACCOUNT',
    ACCOUNT_ACTIVATION_REQUIRED: 'ACCOUNT_ACTIVATION_REQUIRED',
    ACCOUNT_ACTIVATION_SEND: 'ACCOUNT_ACTIVATION_SEND',
    ACCOUNT_ACTIVATION_FAILURE: 'ACCOUNT_ACTIVATION_FAILURE',
    ACCOUNT_ACTIVATION_TOKEN_INVALID: 'ACCOUNT_ACTIVATION_TOKEN_INVALID',
    RESET_PASSWORD: 'RESET_PASSWORD',
    RESET_PASSWORD_TOKEN_INVALID: 'RESET_PASSWORD_TOKEN_INVALID',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    SEND_RESET_PASSWORD_SUCCESS: 'SEND_RESET_PASSWORD_SUCCESS',
    SEND_RESET_PASSWORD_FAILURE: 'SEND_RESET_PASSWORD_FAILURE'
});


function CloseButton({ model, children, ...props }) {
    return (
        <DialogActions>
            <Grid container justify="flex-end">

            <Button
                disabled={ model.state === STATES.LOADING ||
                    model.state === STATES.SIGN_OUT ||
                    model.state === STATES.CLOSED }

                onClick={ () => model.actions.onClose(model) }
                {...props}>{ children || 'Close' }</Button>

            </Grid>
        </DialogActions>
    );
}

export {
    STATES,
    CloseButton
};