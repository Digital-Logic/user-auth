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


function SignUp({ state, setState, message }) {

    switch(state) {
        case STATES.SUCCESS:
            return (
                <Fragment>
                    <DialogTitle>Account Created</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Your account has been created.</DialogContentText>
                        <DialogContentText align="center">Please check your email to activate your account.</DialogContentText>
                        <DialogContentText align="right">Thank You.</DialogContentText>
                    </DialogContent>
                </Fragment>
            );
        case STATES.FAILURE:
            return (
                <Fragment>
                    <DialogTitle>Failure</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">{ message }</DialogContentText>
                    </DialogContent>
                </Fragment>
            );

        default:
            return (
                <Fragment>
                    <DialogTitle>Creating Account</DialogTitle>
                    <DialogContent>
                        <Progress />
                    </DialogContent>
                    <DialogActions>
                        <Grid container justify="flex-end">

                        <Button
                            disabled={true}
                            onClick={() => setState(STATES.CLOSED)}>Close</Button>

                        </Grid>
                    </DialogActions>
                </Fragment>
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