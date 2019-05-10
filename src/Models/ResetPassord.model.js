import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from '../UI/Progress';
import PropTypes from 'prop-types';
import { STATES, CloseButton } from './constants';


function ResetPassword({ model, state }) {

    switch(state) {
        case STATES.RESET_PASSWORD_SUCCESS:
        case STATES.SUCCESS:
            return (
                <Fragment>
                    <DialogTitle align="center">Password Reset Email Sent</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Please check your email to reset your account.</DialogContentText>
                    </DialogContent>
                    <CloseButton model={model}/>
                </Fragment>
            );
        case STATES.RESET_PASSWORD_FAILURE:
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
            case STATES.ACCOUNT_ACTIVATION_SEND:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activation Send</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Please check your email for an an activation link.</DialogContentText>
                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );

        case STATES.ACCOUNT_ACTIVATION_FAILURE:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activation Failure</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">A failure occurred while sending a new activation email.</DialogContentText>
                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );

       default:
        return (
            <Fragment>
                <DialogTitle align="center">Requesting Password Reset</DialogTitle>
                <DialogContent>
                    <Progress />
                </DialogContent>
                <CloseButton model={model} />
            </Fragment>
        );
    }
}

ResetPassword.propTypes = {
    model: PropTypes.object.isRequired,
    state: PropTypes.oneOf(Object.values(STATES)).isRequired
};

export default ResetPassword;