import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignInForm from '../Forms/SignIn.form';
import { connect } from 'react-redux';
import { authActions } from '../Store';
import { STATES, SignInModel } from '../Models';

function SignIn({ className, dispatchSignIn }) {

    const [formKey, setFormKey] = useState(1);
    const [state, setState] = useState(STATES.CLOSED);
    const [message, setMessage] = useState('');

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

            <SignInModel
                state={state}
                setState={setState}
                message={message}
                />
        </Grid>
    );

    function onSubmit(userData) {
        dispatchSignIn({ model: { state, setState, setMessage}, userData})
    }
}

function mapDispatch(dispatch) {
    return {
        dispatchSignIn: ({ model, userData}) => dispatch(authActions.signIn({ model, userData }))
    };
}

export default connect(null, mapDispatch)(SignIn);
