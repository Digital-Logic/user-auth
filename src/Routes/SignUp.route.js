import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignUpForm from '../Forms/SignUp.form';
import { STATES, SignUpModel } from '../Models';
import { authActions } from '../Store';
import { connect } from 'react-redux';
import { ROUTES } from '../Routes';
import { SignInLink } from './SignIn.route';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function SignUp({ className, dispatchSignUp, history }) {

    const [ state, setState ] = useState(STATES.CLOSED);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ formKey, setFormKey ] = useState(1);

    return (
        <Grid container direction="column" alignItems="center" spacing={16}>
            <Grid item>
                <Typography variant="h3" align="center">Sign Up</Typography>
            </Grid>

            <Grid item className={className}>
                <Card raised>
                    <CardContent>

                        <SignUpForm
                            key={formKey}
                            onSubmit={onSubmit} />

                    </CardContent>
                </Card>
            </Grid>

            <Grid item>
                <SignInLink />
            </Grid>

            <SignUpModel
                state={state}
                setState={setState}
                errorMessage={errorMessage}
                onClose={() => {
                    if (state !== STATES.LOADING) {
                        if (state === STATES.SUCCESS)
                            history.push(ROUTES.HOME);
                        else {
                            setState(STATES.CLOSED);
                        }
                    }
                }}
                />

        </Grid>
    );

    function onSubmit(userData) {
        dispatchSignUp({ state, setState, setErrorMessage, userData })
            .then(({ clearForm }={}) => {
                if (clearForm)
                    setFormKey(formKey + 1);
            });
    }
}

function SignUpLink() {
    return (
        <Typography>Don't have an account?
            <Button
                color="primary"
                to={ROUTES.SIGN_UP}
                component={Link}>Create an account</Button>

        </Typography>
    );
}

function mapDispatch(dispatch) {
    return {
        dispatchSignUp: ({ state, setState, setMessage, userData }) =>
            dispatch(authActions.signUp({ model: { state, setState, setMessage }, userData }))
    }
}

export default connect(null, mapDispatch)(SignUp);


export {
    SignUpLink
};