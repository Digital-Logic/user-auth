import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Progress from '../UI/Progress';
import PropTypes from 'prop-types';
import { MODEL_STATES as STATE } from './index';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';

const loadingContent = ({ title, message, actions }) => ({
    [STATE.LOADING]: (
        <Fragment>
            <DialogTitle align="center">{ title || 'Loading' }</DialogTitle>
            <DialogContent>
                <Progress />
            </DialogContent>
        </Fragment>
    ),
    [STATE.SUCCESS]: (
        <Fragment>
            <DialogTitle align="center">{ title || 'Success' }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ message }</DialogContentText>
            </DialogContent>
        </Fragment>
    ),
    [STATE.FAILURE]: (
        <Fragment>
            <DialogTitle align="center">{ title || 'Error' }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ message }</DialogContentText>
            </DialogContent>
        </Fragment>
    ),
    [STATE.FAILURE_DUPLICATE_EMAIL]: (
        <Fragment>
            <DialogTitle align="center">{ title || 'Error Creating Account'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{ message || 'An account with that email address already exist.'}</DialogContentText>
                <DialogContentText align="center">Would you like to
                    <Button
                        color="primary"
                        onClick={actions.onRedirect}
                        >Sign in</Button>
                </DialogContentText>
            </DialogContent>
        </Fragment>
    ),
    [STATE.FAILURE_ACCOUNT_ACTIVATION]: (
        <Fragment>
            <DialogTitle align="center">{ title || 'Account Activation Required'}</DialogTitle>
            <DialogContent>
                <DialogContentText>{ message }</DialogContentText>
                <DialogContentText align="center">
                    <Button onClick={actions.sendActivation} color="primary">Send Activation Email</Button>
                </DialogContentText>
            </DialogContent>
        </Fragment>
    )
});



function LoadingModel({ open, state, actions, message, title, modelContent }) {

    const content = modelContent({ title, message, actions });

    return (
        <Dialog
            open={open}
            onClose={() => {
                if (state !== STATE.LOADING)
                    actions.onClose();
            }}>

            { content[state] }

            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={actions.onClose} disabled={state === STATE.LOADING }>Close</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}


LoadingModel.propTypes = {
    open: PropTypes.bool.isRequired,
    state: PropTypes.oneOf(Object.values(STATE)).isRequired,
    title: PropTypes.string.isRequired,
    actions: PropTypes.shape({
        onClose: PropTypes.func.isRequired
    }),
    message: PropTypes.string,
    modelContent: PropTypes.func.isRequired
};

LoadingModel.defaultProps = {
    state: STATE.LOADING,
    title: 'Loading',
    modelContent: loadingContent
};

export {
    loadingContent
};

export default LoadingModel;