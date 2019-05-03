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
import withModelBase, { CloseButton } from './withModelBase';


function SignIn({ state, onClose, message }) {

    switch(state) {
        case STATES.FAILURE:
            return (
                <Fragment>
                    <DialogTitle align="center">Failure</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">{ message || "Invalid user name or password"}</DialogContentText>
                    </DialogContent>
                    <CloseButton onClose={onClose} />
                </Fragment>
            );
        case STATES.ACCOUNT_ACTIVATION_REQUIRED:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activation Required</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Your account has not been activated yet.</DialogContentText>
                        <DialogContentText align="center">Please check your email for an activation link.</DialogContentText>
                        <DialogContentText align="center"><Button color="primary">Resend activation link</Button></DialogContentText>
                    </DialogContent>
                    <CloseButton onClose={onClose} />
                </Fragment>
            );
        default:
            return (
                <Fragment>
                    <DialogTitle align="center">Logging In</DialogTitle>
                    <DialogContent>
                        <Progress />
                    </DialogContent>
                    <CloseButton onClose={onClose} />
                </Fragment>
            );
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