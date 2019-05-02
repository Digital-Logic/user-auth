import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Progress from '../UI/Progress';
import PropTypes from 'prop-types';
import { STATES } from './constants';
import withModelBase from './withModelBase';
import { ROUTES } from '../Routes';
import { Link } from 'react-router-dom';

function SignIn({ state, setState, message }) {

    switch(state) {
        case STATES.FAILURE:
            return (
                <Fragment>
                    <DialogTitle align="center">Failure</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">{ message || "Invalid user name or password"}</DialogContentText>
                    </DialogContent>
                    <CloseButton />
                </Fragment>
            );
        case STATES.ACCOUNT_ACTIVATION_REQUIRED:
            return (
                <Fragment>
                    <DialogTitle align="center">Failure</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Account activation required.</DialogContentText>
                        <DialogContentText align="center"><Button>Resend activation link</Button></DialogContentText>
                    </DialogContent>
                    <CloseButton />
                </Fragment>
            );
        default:
            return (
                <Fragment>
                    <DialogTitle align="center">Logging In</DialogTitle>
                    <DialogContent>
                        <Progress />
                    </DialogContent>
                    <CloseButton />
                </Fragment>
            );
    }

    function CloseButton() {
        return (
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button
                        disabled={state === STATES.LOADING}
                        onClick={onClose}>close</Button>
                </Grid>
            </DialogActions>
        );
    }

    function onClose() {
        setState(STATES.CLOSED);
    }
}

SignIn.propTypes = {
    state: PropTypes.oneOf(Object.values(STATES)).isRequired,
    setState: PropTypes.func.isRequired
};

SignIn.defaultProps = {
    state: STATES.CLOSED,
};

export default withModelBase()(SignIn);