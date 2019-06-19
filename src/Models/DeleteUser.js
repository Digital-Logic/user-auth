import React, { Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Progress from '../UI/Progress';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    deleteBtn: {
        borderColor: theme.palette.error.main,
        color: theme.palette.text.secondary,
        '& svg': {
            marginRight: theme.spacing.unit
        }
    }
});

const ConfirmDeleteAccount = withStyles(styles)(({ onClose, actions, classes }) => {
    return  (
        <Fragment>
            <DialogTitle align="center">Delete Account</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">Are you sure you want to delete your account?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="space-between">
                    <Button onClick={onClose}>Close</Button>
                    <Button
                        className={classes.deleteBtn}
                        onClick={actions.onDeleteUser}
                        variant="outlined">Delete Account</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
});

function DeletingAccount({ onClose, message }) {
    return  (
        <Fragment>
            <DialogTitle align="center">Deleting Account</DialogTitle>
            <DialogContent>
                <Progress />
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={ onClose }>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function DeleteAccountSuccess({ onClose }) {
    return  (
        <Fragment>
            <DialogTitle align="center">Account Deleted</DialogTitle>
            <DialogContent>
                <DialogContentText>Your Account has been deleted.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={ onClose }>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function DeleteAccountFailed({ onClose }) {
    return (
        <Fragment>
            <DialogTitle align="center">Account Deletion Failed</DialogTitle>
            <DialogContent>
                <DialogContentText>Failure in deleting account.</DialogContentText>
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
    ConfirmDeleteAccount,
    DeletingAccount,
    DeleteAccountSuccess,
    DeleteAccountFailed
}