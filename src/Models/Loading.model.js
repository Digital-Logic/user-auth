import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from '../UI/Progress';
import PropTypes from 'prop-types';
import { STATES, CloseButton } from './constants';


function LoadingModel({ model, state }) {

    switch(state) {
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
        //             </DialogContent>
        //         </Fragment>
        //     );
       default:
        return (
            <Fragment>
                <DialogTitle>Loading</DialogTitle>
                <DialogContent>
                    <Progress />
                </DialogContent>
                <CloseButton model={model} />
            </Fragment>
        );
    }
}

LoadingModel.propTypes = {
    model: PropTypes.object.isRequired,
    state: PropTypes.oneOf(Object.values(STATES)).isRequired,
};


export default LoadingModel;