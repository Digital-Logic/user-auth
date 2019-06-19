import React, { Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Progress from '../UI/Progress';
import ChangePasswordForm from '../Forms/ChangePassword.form';

function ChangingPassword({ state, onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Changing Password</DialogTitle>
            <DialogContent>
                <Progress />
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose} disabled>Cancel</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function ChangePasswordModel({ state, onClose, actions }) {

    return (
        <Fragment>
            <DialogTitle align="center">Changing Password</DialogTitle>
            <DialogContent>
                <ChangePasswordForm
                    onSubmit={pwds => actions.onChangePassword({ ...pwds })}
                    onCancel={actions.onCancel} />
            </DialogContent>
        </Fragment>
    );
}

function ChangePasswordSuccess({ state, onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Password Changes</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">Your password has been successfully changed</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={onClose}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}


function ChangePasswordFailed({ state, onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Error Changing Password</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">An error ocurred while updating your password.</DialogContentText>
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
    ChangingPassword,
    ChangePasswordModel,
    ChangePasswordSuccess,
    ChangePasswordFailed
};