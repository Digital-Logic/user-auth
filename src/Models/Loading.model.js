import React, { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Progress from '../UI/Progress';
import PropTypes from 'prop-types';
import { STATES } from './constants';
import withModelBase, { CloseButton } from './withModelBase';


function LoadingModel({ state, onClose, content, errorMessage}) {

    switch(state) {
        case STATES.SUCCESS:
            return (
                <Fragment>
                    <DialogTitle>{ content[STATES.SUCCESS].title || 'Success' }</DialogTitle>
                    <DialogContent>
                        <DialogContentText></DialogContentText>
                    </DialogContent>
                </Fragment>
            );
        case STATES.FAILURE:
            return (
                <Fragment>
                    <DialogTitle>{ content[STATES.FAILURE].title || 'Failure'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{ errorMessage || 'An error occurred' }</DialogContentText>
                    </DialogContent>
                </Fragment>
            );
       default:
        return (
            <Fragment>
                <DialogTitle>{ content[STATES.LOADING].title || 'Loading'}</DialogTitle>
                <DialogContent>
                    <Progress />
                </DialogContent>
                <CloseButton onClose={onClose} />
            </Fragment>
        );
    }
}

LoadingModel.propTypes = {
    state: PropTypes.oneOf(Object.values(STATES)).isRequired,
    setState: PropTypes.func.isRequired
};

LoadingModel.defaultProps = {
    state: STATES.CLOSED,
};

export default withModelBase()(LoadingModel);