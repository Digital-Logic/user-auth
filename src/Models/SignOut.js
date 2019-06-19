import React, { Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Progress from '../UI/Progress';
import Button from '@material-ui/core/Button';


function SignOut({ state, onClose, actions }) {
    return  (
        <Fragment>
            <DialogTitle align="center">Logging Out</DialogTitle>
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

export {
    SignOut
};