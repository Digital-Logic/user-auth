import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Progress from '../UI/Progress';
import PropTypes from 'prop-types';
import { ROUTES } from '../Routes';
import { STATES, CloseButton } from './constants';
import ResetPasswordForm from '../Forms/ResetPassword.form';


function AppInitModel({ model, state }) {

    switch(state) {

        case STATES.ACCOUNT_ACTIVATED:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activated</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Your account has been activated.</DialogContentText>

                        <DialogContentText align="center">You can now log in.
                            <Button
                                color="primary"
                                onClick={() => model.actions.redirect(ROUTES.SIGN_IN)}
                            >Login</Button>
                        </DialogContentText>

                    </DialogContent>
                    <CloseButton model={model} />
                </Fragment>
            );
        case STATES.ACCOUNT_ACTIVATION_TOKEN_INVALID:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activation Failed</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">This token is no longer valid</DialogContentText>
                        <DialogContentText align="center">
                            <Button
                                color="primary"
                                onClick={ model.actions.onSendEmailVerification }
                            >Send new activation code</Button>
                        </DialogContentText>

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

        case STATES.RESET_PASSWORD:
            return (
                <Fragment>
                    <DialogTitle align="center">Reset Password</DialogTitle>
                    <DialogContent>
                        <ResetPasswordForm onClose={ model.actions.onClose } />
                    </DialogContent>
                </Fragment>
            );


        case STATES.RESET_PASSWORD_TOKEN_INVALID:
            return (
                <Fragment>
                    <DialogTitle align="center">Reset Password Error</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Reset password token has expired.</DialogContentText>
                        <DialogContentText align="center">
                            <Button color="primary" onClick={ model.actions.sendResetPassword }>Reset Password</Button>
                        </DialogContentText>
                    </DialogContent>
                    <CloseButton model={model}/>
                </Fragment>
            );
        case STATES.RESET_PASSWORD_SUCCESS:
            return (
                <Fragment>
                    <DialogTitle align="center">Password Reset Email Sent</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Please check your email to activate your account.</DialogContentText>
                    </DialogContent>
                    <CloseButton model={model}/>
                </Fragment>
            );

        case STATES.SIGN_OUT:
            return (
                <Fragment>
                    <DialogTitle>Logging Out</DialogTitle>
                    <DialogContent>
                        <Progress />
                    </DialogContent>
                    <CloseButton model={model}/>
                </Fragment>
            );

        default:
            return (
                <Fragment>
                    <DialogTitle>Loading</DialogTitle>
                    <DialogContent>
                        <Progress />
                    </DialogContent>
                    <CloseButton model={model}/>
                </Fragment>
            );
    }
}

AppInitModel.propTypes = {
    model: PropTypes.object.isRequired
};

export default AppInitModel;