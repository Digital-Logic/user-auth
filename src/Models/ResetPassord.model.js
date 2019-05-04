import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from '../UI/Progress';
import PropTypes from 'prop-types';
import { STATES } from './constants';
import withModelBase, { CloseButton } from './withModelBase';


function ResetPassword({ state, onClose, errorMessage, onSendVerificationEmail }) {

    switch(state) {
        case STATES.SUCCESS:
            return (
                <Fragment>
                    <DialogTitle align="center">Password Reset Email Sent</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Please check your email to activate your account.</DialogContentText>
                    </DialogContent>
                    <CloseButton onClose={onClose}/>
                </Fragment>
            );
        case STATES.FAILURE:
            return (
                <Fragment>
                    <DialogTitle align="center">Password Reset Failed</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">{ errorMessage || 'An error occurred' }</DialogContentText>
                        {
                            typeof errorMessage === 'string' && errorMessage.includes('activated') ?
                                <DialogContentText align="center">Please check your email to activate your account
                                    <Button
                                        onClick={onSendVerificationEmail}
                                        color="primary">Resend Verification Email</Button>
                                </DialogContentText>
                            : ''
                        }
                    </DialogContent>
                    <CloseButton onClose={onClose} />
                </Fragment>
            );
            case STATES.ACCOUNT_ACTIVATION_SEND:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activation Send</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Please check your email for an an activation link.</DialogContentText>
                    </DialogContent>
                    <CloseButton onClose={onClose} />
                </Fragment>
            );

        case STATES.ACCOUNT_ACTIVATION_FAILURE:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activation Failure</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">A failure occurred while sending a new activation email.</DialogContentText>
                    </DialogContent>
                    <CloseButton onClose={onClose} />
                </Fragment>
            );

       default:
        return (
            <Fragment>
                <DialogTitle align="center">Requesting Password Reset</DialogTitle>
                <DialogContent>
                    <Progress />
                </DialogContent>
                <CloseButton onClose={onClose} />
            </Fragment>
        );
    }
}

ResetPassword.propTypes = {
    state: PropTypes.oneOf(Object.values(STATES)).isRequired,
    onSendVerificationEmail: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired
};

ResetPassword.defaultProps = {
    state: STATES.CLOSED,
};

export default withModelBase()(ResetPassword);