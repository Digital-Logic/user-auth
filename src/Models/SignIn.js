import React, { Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Progress from '../UI/Progress';
import Button from '@material-ui/core/Button';


function SigningInModel({ onClose }) {
    return  (
        <Fragment>
            <DialogTitle align="center">Signing In</DialogTitle>
            <DialogContent>
                <Progress />
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={ onClose }>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}

function SignInFailedModel({ onClose, message }) {
    return  (
        <Fragment>
            <DialogTitle align="center">Sign In Failure</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">{ message || "Invalid user name or password"}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Grid container justify="flex-end">
                    <Button onClick={ onClose }>Close</Button>
                </Grid>
            </DialogActions>
        </Fragment>
    );
}




export {
    SigningInModel,
    SignInFailedModel
};