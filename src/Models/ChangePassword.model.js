import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Progress from '../UI/Progress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { MODEL_STATES as STATE } from './index';
import { ChangePasswordForm } from '../Forms';


const content = ({ title, message, actions }) => ({
    [STATE.OPEN]: (
        <Fragment>
            <DialogTitle align="center">{ title }</DialogTitle>
            <DialogContent>
                <ChangePasswordForm actions={actions}/>
            </DialogContent>
        </Fragment>
    ),
    [STATE.LOADING]: (
        <Fragment>
            <DialogTitle align="center">{ title }</DialogTitle>
            <DialogContent>
                <Progress />
            </DialogContent>
        </Fragment>
    ),
    [STATE.SUCCESS]: (
        <Fragment>
            <DialogTitle align="center">{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ message }</DialogContentText>
            </DialogContent>
        </Fragment>
    ),
    [STATE.FAILURE]: (
        <Fragment>
            <DialogTitle align="center">{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ message }</DialogContentText>
            </DialogContent>
        </Fragment>
    )
});

function ChangePassword({ open, state, actions, message, title, modelContent }) {

    //actions = createActions(actions, dispatch);

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
                <Grid container justify="space-between">

                    <Button
                        onClick={actions.onClose}>{state === STATE.OPEN ? 'cancel' : 'close'}</Button>

                    <Button variant="outlined"
                        disabled={state !== STATE.OPEN}
                        onClick={actions.onFormSubmit}>Change Password</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}


ChangePassword.propTypes = {
    open: PropTypes.bool.isRequired,
    state: PropTypes.oneOf(Object.values(STATE)).isRequired,
    title: PropTypes.string.isRequired,
    actions: PropTypes.shape({
        onClose: PropTypes.func,
        onConform: PropTypes.func,
        onDeleteUser: PropTypes.func
    }).isRequired,
    message: PropTypes.string,
    modelContent: PropTypes.func.isRequired
};

ChangePassword.defaultProps = {
    state: STATE.OPEN,
    title: 'Change Password',
    modelContent: content
};

export {
    content
};

export default ChangePassword;