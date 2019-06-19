import React, { Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import { ROUTES } from '../Routes';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const AccountActivated = withRouter(({ state, onClose, actions, history }) => {
    return  (
        <Fragment>
            <DialogTitle align="center">Account Activated</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">Your account has been activated.</DialogContentText>

                <DialogContentText align="center">You can now log in.
                    <Button
                        color="primary"
                        onClick={() =>  {
                            history.push(ROUTES.SIGN_IN);
                            onClose();
                        }}
                    >Login</Button>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
});

function AccountActivationRequired({ onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Account Activation Required</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">Your account has not been activated yet.</DialogContentText>
                <DialogContentText align="center">Please check your email to activate your account.</DialogContentText>

                <DialogContentText align="center">
                    <Button
                        onClick={ actions.onSendVerificationEmail }
                        color="primary">Resend Verification Email</Button>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={ onClose }>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function AccountActivationFailed({ setState, onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Account Activation Failed</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">This token is no longer valid</DialogContentText>
                <DialogContentText align="center">
                    <Button
                        color="primary"
                        onClick={ actions.onSendEmailVerification }
                    >Send new activation code</Button>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose}>close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function AccountActivationSend({ setState, onClose, actions}) {
    return (
        <Fragment>
            <DialogTitle align="center">Account Activation Send</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">Please check your email for an an activation link.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose}>close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

export {
    AccountActivated,
    AccountActivationRequired,
    AccountActivationFailed,
    AccountActivationSend
};

