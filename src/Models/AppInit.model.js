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
import withModelBase, { CloseButton } from './withModelBase';


function AppInitModel({ state, onClose, onLogin }) {

    switch(state) {

        case STATES.ACCOUNT_ACTIVATED:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activated</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">Your account has been activated.</DialogContentText>

                        <DialogContentText align="center">You can now log in.
                            <Button
                                color="primary"
                                onClick={() => { onLogin(); onClose(); }}
                            >Login</Button>
                        </DialogContentText>

                    </DialogContent>
                    <CloseButton onClose={onClose} state={state} />
                </Fragment>
            );
        case STATES.ACCOUNT_ACTIVATION_TOKEN_INVALID:
            return (
                <Fragment>
                    <DialogTitle align="center">Account Activation Failed</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">This token is no longer valid</DialogContentText>
                        <DialogContentText align="center">
                            <Button
                                color="primary"
                                onClick={() => { }}
                            >Send new activation code</Button>
                        </DialogContentText>

                    </DialogContent>
                    <CloseButton onClose={onClose} state={state} />
                </Fragment>
            );

       default:
        return (
            <Fragment>
                <DialogTitle>Loading</DialogTitle>
                <DialogContent>
                    <Progress />
                </DialogContent>
                <CloseButton onClick={ onClose } state={state}/>
            </Fragment>
        );
    }
}

AppInitModel.propTypes = {
    state: PropTypes.oneOf(Object.values(STATES)).isRequired,
};

AppInitModel.defaultProps = {
    state: STATES.CLOSED,
};

export default withModelBase()(AppInitModel);