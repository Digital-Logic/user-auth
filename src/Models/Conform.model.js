import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { MODEL_STATES as STATE } from './index';

const content = ({ title, message }) => ({
    [STATE.OPEN]: (
        <Fragment>
            <DialogTitle align="center">{ title || 'Delete' }</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">{ message }</DialogContentText>
            </DialogContent>
        </Fragment>
    )
});


function Conform({ open, state, actions, message, conform, title, modelContent }) {

    const content = modelContent({ title, message, actions, conform });

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
                        onClick={actions.onClose}>cancel</Button>

                    <Button
                        variant="outlined"
                        onClick={actions.onConform}>{ conform || 'Conform' }</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    );
}

Conform.propTypes = {
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

Conform.defaultProps = {
    state: STATE.OPEN,
    modelContent: content
};

export {
    content
};

export default Conform;