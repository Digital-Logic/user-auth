import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from '../UI/Progress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { STATES, CloseButton } from './constants';
import ChangePasswordForm from '../Forms/ChangePassword.form';

const styles = theme => ({
    deleteBtn: {
        borderColor: theme.palette.error.main,
        color: theme.palette.text.secondary,
        '& svg': {
            marginRight: theme.spacing.unit
        }
    }
});

function ProfileModel({ model, state, classes }) {

    switch(state) {

        case STATES.CHANGE_PASSWORDS_FORM:
            return (
                <Fragment>
                <DialogTitle align="center">Delete Account</DialogTitle>
                <DialogContent>
                    <ChangePasswordForm
                        onSubmit={ pwds => model.actions.changePassword({ ...pwds, model })}
                        onCancel={model.actions.onCancel}/>
                </DialogContent>
            </Fragment>
            );
        case STATES.CHANGE_PASSWORDS_SUCCESS:
            return (
                <Fragment>
                    <DialogTitle align="center">Password Changes</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Your password has been successfully changed</DialogContentText>
                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );
        case STATES.CHANGE_PASSWORDS_FAILURE:
            return (
                <Fragment>
                    <DialogTitle align="center">Error Changing Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">An error ocurred while updating your password.</DialogContentText>
                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );
        case STATES.CONFIRM_DELETE_USER:
            return (
                <Fragment>
                    <DialogTitle align="center">Delete Account</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Are you sure you want to delete your account?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Grid container justify="space-between">
                            <Button onClick={model.actions.onClose}>Close</Button>
                            <Button
                                className={classes.deleteBtn}
                                onClick={model.actions.deleteUser}
                                variant="outlined">Delete Account</Button>
                        </Grid>
                    </DialogActions>
                </Fragment>
            );

        case STATES.DELETE_ACCOUNT_SUCCESS:
            return (
                <Fragment>
                    <DialogTitle align="center">Delete Account</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Your account has been deleted.</DialogContentText>
                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );

        case STATES.SEND_SET_PASSWORD:
            return (
                <Fragment>
                    <DialogTitle align="center">Password Reset eMail Sent</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Please check your email to reset your account.</DialogContentText>
                    </DialogContent>
                    <CloseButton model={model}/>
                </Fragment>
            );

        case STATES.SEND_SET_PASSWORD_FAILURE:
            return (
                <Fragment>
                    <DialogTitle align="center">Password Reset Failed</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">{ model.messages[STATES.RESET_PASSWORD_FAILURE] || 'An error occurred' }</DialogContentText>
                        {
                            model.messages[STATES.RESET_PASSWORD_FAILURE].includes('activated') ?
                                <DialogContentText align="center">Please check your email to activate your account
                                    <Button
                                        onClick={model.actions.onSendEmailVerification }
                                        color="primary">Resend Verification Email</Button>
                                </DialogContentText>
                            : ''
                        }
                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );

        default:
            return (
                <Fragment>
                    <DialogTitle>Loading</DialogTitle>
                    <DialogContent>
                        <Progress />
                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );
    }
}

ProfileModel.propTypes = {
    model: PropTypes.object.isRequired,
    state: PropTypes.oneOf(Object.values(STATES)).isRequired,
};


export default withStyles(styles)(ProfileModel);