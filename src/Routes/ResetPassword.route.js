import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ResetPasswordForm from '../Forms/ResetPassword.form';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';
import { connect } from 'react-redux';
import { authActions } from '../Store';
import { STATES as MODEL_STATES, ResetPasswordModel } from '../Models'
import { SignInLink } from './SignIn.route'

function ResetPassword({ className, resetPassword, sendVerificationEmail, history }) {

    const [formKey, setFormKey ] = useState(1);
    const [ state, setState ] = useState(MODEL_STATES.CLOSED);
    const [ errorMessage, setErrorMessage ] = useState();
    const [ userData, setUserData ] = useState();

    return (
        <Grid container direction="column" alignItems="center" spacing={16}>
            <Grid item>
                <Typography variant="h3" align="center">Reset Password</Typography>
            </Grid>
            <Grid item className={className}>
                <Card raised>
                    <CardContent>
                        <ResetPasswordForm
                            onSubmit={_onSubmit}
                            key={ formKey } />

                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <SignInLink />
            </Grid>

            <ResetPasswordModel
                state={state}
                setState={setState}
                errorMessage={errorMessage}
                onSendVerificationEmail={() => {
                    sendVerificationEmail({ userData, model: { state, setState, setErrorMessage } })
                        .then(({ clearForm, redirect }={}) => {
                            if (redirect)
                                history.push(redirect);

                            if (clearForm)
                                setFormKey(formKey + 1);
                        });
                }}
                />
        </Grid>
    );

    function _onSubmit(userData) {
        setUserData(userData);
        resetPassword({ userData, model: { setState, setErrorMessage }});
    }
}

function mapDispatch(dispatch) {
    return {
        resetPassword: ({userData, model}) => dispatch(authActions.sendResetPasswordEmail({ userData, model })),
        sendVerificationEmail: ({ userData, model }) =>
            dispatch(authActions.sendEmailVerification({ userData, model }))
    };
}


function ResetPasswordLink() {
    return (
        <Typography variant="body2" align="left">Forgot your password? <br />
            <Button
                to={ROUTES.RESET_PASSWORD}
                component={Link}
                color="primary"
            >Reset Password</Button>
        </Typography>
    );
}

export default connect(
    null,
    mapDispatch
)(ResetPassword);

export {
    ResetPasswordLink
};