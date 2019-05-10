import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignInForm from '../Forms/SignIn.form';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { authActions } from '../Store';
import { STATES as MODEL_STATES, SignInModel, withModel } from '../Models';
import { ROUTES } from '../Routes';
import { Link } from 'react-router-dom';
import { SignUpLink } from './SignUp.route';
import compose from 'recompose/compose';

function SignIn({ className, model, signInAction, sendVerificationEmail, history }) {

    const [formKey, setFormKey] = useState(1);
    const [errorMessage, setErrorMessage] = useState();


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
                <SignUpLink />
            </Grid>

            {/* <SignInModel
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
                /> */}
        </Grid>
    );

    function onSubmit(userData) {

        // Create custom actions that the model can use
        model.actions.createActions({
            sendVerificationEmail: () => {
                sendVerificationEmail({ userData, model})
                    .then(({ clearForm }={}) => {
                        if (clearForm)
                            setFormKey(formKey + 1);
                    });
            }
        });

        // Try to sign the user in.
        signInAction({ userData, model })
            .then(({clearForm, redirect}={}) => {
                if (redirect)
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
        signInAction: (...args) => dispatch(authActions.signIn(...args)),
        sendVerificationEmail: (...args) => dispatch(authActions.sendEmailVerification(...args))
    };
}

export default compose(
    connect(null, mapDispatch),
    withModel(SignInModel)
)(SignIn);

export {
    SignInLink
};
