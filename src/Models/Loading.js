import React, { Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Progress from '../UI/Progress';
import DialogContentText from '@material-ui/core/DialogContentText';

function Loading ({ state, onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Loading</DialogTitle>
            <DialogContent>
                <Progress />
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button
                        onClick={onClose}
                        disabled={state === 'LOADING'}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function ErrorModel({ state, onClose, actions, message }) {
    return (
        <Fragment>
            <DialogTitle align="center">An Error Occurred</DialogTitle>
            <DialogContent>
                <DialogContentText>{ message }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button
                        onClick={onClose}
                        disabled={state === 'LOADING'}>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    )
}

export {
    Loading,
    ErrorModel
};
