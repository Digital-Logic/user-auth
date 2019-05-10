import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from '../UI/Progress';
import PropTypes from 'prop-types';
import { STATES, CloseButton } from './constants';

function SignIn({ model, state, errorMessage }) {

    switch(state) {
        case STATES.FAILURE:
            return (
                <Fragment>
                    <DialogTitle align="center">Sign In Failure</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">{ errorMessage || "Invalid user name or password"}</DialogContentText>
                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );

        case STATES.LOADING:
            return (
                <Fragment>
                    <DialogTitle align="center">Sending Account Activation</DialogTitle>
                    <DialogContent>
                        <Progress />
                    </DialogContent>
                    <CloseButton model={model}/>
                </Fragment>
            );

        case STATES.ACCOUNT_ACTIVATION_REQUIRED:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activation Required</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Your account has not been activated yet.</DialogContentText>
                        <DialogContentText align="center">Please check your email to activate your account.</DialogContentText>

                        <DialogContentText align="center">
                            <Button
                                onClick={ model.actions.sendVerificationEmail }
                                color="primary">Resend Verification Email</Button>
                        </DialogContentText>

                    </DialogContent>
                    <CloseButton model={ model }/>
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
                    <DialogTitle align="center">Logging In</DialogTitle>
                    <DialogContent>
                        <Progress />
                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );
    }
}

SignIn.propTypes = {
    state: PropTypes.oneOf(Object.values(STATES)).isRequired
};

SignIn.defaultProps = {
    state: STATES.CLOSED,
};

export default SignIn;