import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignInForm from '../Forms/SignIn.form';
import Button from '@material-ui/core/Button';
import { ResetPasswordLink } from './ResetPassword.route';
import { connect } from 'react-redux';
import { authActions } from '../Store';
import { STATES, SignInModel } from '../Models';
import { ROUTES } from '../Routes';
import { Link } from 'react-router-dom';

function SignIn({ className, dispatchSignIn, sendVerificationEmail, history }) {

    const [formKey, setFormKey] = useState(1);
    const [state, setState] = useState(STATES.CLOSED);
    const [errorMessage, setErrorMessage] = useState();
    const [userData, setUserData] = useState();

    return (
        <Grid container direction="column" alignItems="center" spacing={16}>
            <Grid item>
                <Typography variant="h3" align="center">Sign in</Typography>
            </Grid>

            <Grid item className={className}>
                <Card raised>
                    <CardContent>
                        <SignInForm
                            key={formKey}
                            onSubmit={onSubmit}/>

                    </CardContent>
                </Card>
            </Grid>

            <Grid item>
                <ResetPasswordLink />
            </Grid>

            <SignInModel
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
                sendVerificationEmail={sendVerificationEmail}
                />
        </Grid>
    );

    function onSubmit(userData) {

        setUserData(userData);

        dispatchSignIn({ userData, model: { state, setState, setErrorMessage} })
            .then(({ clearForm, redirect }={}) => {
                if(redirect)
                    history.push(redirect);

                if (clearForm)
                    setFormKey(formKey + 1);
            });
    }
}

function SignInLink() {
    return (
        <Typography align="center">Already have an account?
            <Button
                color="primary"
                component={Link}
                to={ROUTES.SIGN_IN}>Sign in</Button>
        </Typography>
    );
}

function mapDispatch(dispatch) {
    return {
        dispatchSignIn: ({ userData, model }) => dispatch(authActions.signIn({ userData, model })),
        sendVerificationEmail: ({ userData, model }) =>
                dispatch(authActions.sendEmailVerification({ userData, model }))
    };
}

export default connect(null, mapDispatch)(SignIn);

export {
    SignInLink
};
