import React, { Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Progress from '../UI/Progress';
import Button from '@material-ui/core/Button';

function SignUpSuccess({ onClose }) {
    return (
        <Fragment>
            <DialogTitle align="center">Account Created</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">Your account has been created.</DialogContentText>
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

function SignUpFailed({ onClose }) {
    return (
        <Fragment>
            <DialogTitle align="center">Failure</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">{"Unknown Error Occurred"}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function DuplicateAccount({ onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Account Exist</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">An account with that email address already exist.</DialogContentText>

                <DialogContentText align="center">
                    Would you like to <Button color="primary" onClick={actions.onLogin}>sign in</Button>
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

function CreatingAccount({ onClose }) {
    return (
        <Fragment>
            <DialogTitle align="center">Creating Account</DialogTitle>
            <DialogContent>
                <Progress />
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button disabled onClick={onClose}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

export {
    SignUpSuccess,
    SignUpFailed,
    DuplicateAccount,
    CreatingAccount
};