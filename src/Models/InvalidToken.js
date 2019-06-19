import React, { Fragment } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';


function InvalidToken({ state, onClose, actions }) {
    return (
        <Fragment>
            <DialogTitle align="center">Account Activation Failed</DialogTitle>
            <DialogContent>
                <DialogContentText align="center">This token is no longer valid</DialogContentText>
                <DialogContentText align="center">
                    <Button
                        color="primary"
                        onClick={ actions.sendValidationCode }
                    >Send new activation code</Button>
                </DialogContentText>
            </DialogContent>
        </Fragment>
    );
}

export default InvalidToken;