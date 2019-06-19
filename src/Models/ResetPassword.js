import React, { Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import ResetPasswordForm from '../Forms/ResetPassword.form';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';


function ResetPassword({ state, onClose, actions }) {
    return  (
        <Fragment>
            <DialogTitle align="center">Reset Password</DialogTitle>
            <DialogContent>
                <ResetPasswordForm
                    onCancel={ actions.onCancel }
                    onSubmit={ (pwd) => actions.onResetPassword({  pwd }) }
                    />
            </DialogContent>
        </Fragment>
    );
}

const ResetPasswordSuccess = withRouter(({ state, onClose, actions, history }) => {
    return  (
        <Fragment>
             <DialogTitle align="center">Password Reset</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">Your password has been successfully reset.</DialogContentText>
                <DialogContentText align="center">Please login with your new password.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={ () => onClose({ history })}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
});


function ResetPasswordFailed({ state, onClose, actions }) {
    return  (
        <Fragment>
             <DialogTitle align="center">Password Reset Failed</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">An error occurred while trying to reset your password.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function ResetPasswordTokenInvalid({ state, onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Reset Password Error</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">Reset password token has expired.</DialogContentText>
                <DialogContentText align="center">
                    <Button color="primary">Send Reset Password</Button>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}


function SendResetPasswordEmailSuccess({ state, onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Password Reset Email Sent</DialogTitle>
                <DialogContent>
                    <DialogContentText align="center">Please check your email to activate your account.</DialogContentText>
                </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function SendResetPasswordEmailFailure({ state, onClose, actions, message }) {
    return (
        <Fragment>
            <DialogTitle align="center">Error Sending Password Reset Email</DialogTitle>
                <DialogContent>
                    <DialogContentText align="center">{ message }</DialogContentText>
                </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}


export {
    ResetPassword,
    ResetPasswordSuccess,
    ResetPasswordFailed,
    ResetPasswordTokenInvalid,
    SendResetPasswordEmailSuccess,
    SendResetPasswordEmailFailure
};
