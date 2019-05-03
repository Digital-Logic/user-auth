import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Progress from '../UI/Progress';
import PropTypes from 'prop-types';
import { STATES } from './constants';
import withModelBase from './withModelBase';
import { ROUTES } from '../Routes';
import { Link } from 'react-router-dom';

function SignUp({ state, onClose, errorMessage }) {

    switch(state) {
        case STATES.SUCCESS:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Created</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Your account has been created.</DialogContentText>
                        <DialogContentText align="center">Please check your email to activate your account.</DialogContentText>
                    </DialogContent>
                    <CloseButton />
                </Fragment>
            );
        case STATES.FAILURE:
            return (
                <Fragment>
                    <DialogTitle align="center">Failure</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">{ errorMessage || "Unknown Error Occurred"}</DialogContentText>
                    </DialogContent>
                    <CloseButton />
                </Fragment>
            );

        case STATES.DUPLICATE_ACCOUNT:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Exist</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">An account with that email address already exist.</DialogContentText>

                        <DialogContentText align="center">
                            Would you like to <Button color="primary" to={ROUTES.SIGN_IN} component={Link}>sign in</Button>
                        </DialogContentText>

                    </DialogContent>
                    <CloseButton />
                </Fragment>
            );

        default:
            return (
                <Fragment>
                    <DialogTitle align="center">Creating Account</DialogTitle>
                    <DialogContent>
                        <Progress />
                    </DialogContent>
                    <CloseButton />
                </Fragment>
            );
    }

    function CloseButton() {
        return (
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button
                        disabled={state === STATES.LOADING}
                        onClick={ onClose }>close</Button>
                </Grid>
            </DialogActions>
        );
    }
}

SignUp.propTypes = {
    state: PropTypes.oneOf(Object.values(STATES)).isRequired,
    setState: PropTypes.func.isRequired
};

SignUp.defaultProps = {
    state: STATES.CLOSED,
};

export default withModelBase()(SignUp);