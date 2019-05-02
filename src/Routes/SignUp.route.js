import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignUpForm from '../Forms/SignUp.form';
import { STATES, SignUpModel } from '../Models';
import { authActions } from '../Store';
import { connect } from 'react-redux';

function SignUp({ className, dispatchSignUp }) {

    const [ state, setState ] = useState(STATES.CLOSED);
    const [ message, setMessage ] = useState('');
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

            <SignUpModel
                state={state}
                setState={setState}
                message={message}
                />

        </Grid>
    );

    function onSubmit(userData) {
        dispatchSignUp({ state, setState, setMessage, userData })
            .then(({ clearForm }={}) => {
                if (clearForm)
                    setFormKey(formKey + 1);
            });
    }
}

function mapDispatch(dispatch) {
    return {
        dispatchSignUp: ({ state, setState, setMessage, userData }) =>
            dispatch(authActions.signUp({ model: { state, setState, setMessage }, userData }))
    }
}

export default connect(null, mapDispatch)(SignUp);
