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


function LoadingModel({ state, setState }) {

    //switch(state) {
        // case STATES.SUCCESS:
        //     return (
        //         <Fragment>
        //             <DialogTitle>Success</DialogTitle>
        //             <DialogContent>
        //                 <DialogContentText></DialogContentText>
        //             </DialogContent>
        //         </Fragment>
        //     );
        // case STATES.FAILURE:
        //     return (
        //         <Fragment>
        //             <DialogTitle>Failure</DialogTitle>
        //             <DialogContent>
        //                 <DialogContentText>An error occurred</DialogContentText>
        //             </DialogContent>
        //         </Fragment>
        //     );
       // default:
        return (
            <Fragment>
                <DialogTitle>Loading</DialogTitle>
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
   // }
}

LoadingModel.propTypes = {
    state: PropTypes.oneOf(Object.values(STATES)).isRequired,
    setState: PropTypes.func.isRequired
};

LoadingModel.defaultProps = {
    state: STATES.CLOSED,
};

export default withModelBase()(LoadingModel);