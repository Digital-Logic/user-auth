import React from 'react';
import { Form, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { Input, PasswordInput, required, minLengthSeven, isEmail, conformPassword } from '../UI/form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { authActions } from '../Store';
import { withRouter } from 'react-router-dom';

function SignUpForm({handleSubmit, history }) {
    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <Grid container spacing={16} direction="column">
                <Input
                    name="email"
                    label="Email Address"
                    validate={[required, isEmail ]}
                />

                <Input
                    name="firstName"
                    label="First Name"
                />

                <Input
                    name="lastName"
                    label="Last Name"
                />

                <PasswordInput
                    name="pwd"
                    label="Password"
                    validate={[required, minLengthSeven]}
                />

                <PasswordInput
                    name="confirmPwd"
                    label="Confirm Password"
                    validate={[required, minLengthSeven, conformPassword ]}
                />

                <Grid item container justify="flex-end">
                    <Button
                        variant="outlined"
                        type="submit">Submit</Button>
                </Grid>
            </Grid>
        </Form>
    );

    function onSubmit(formData, dispatch) {
        dispatch(authActions.signUp(formData))
            .then(({redirect}) => {
                if (redirect)
                    history.push(redirect);
            });
    }
}



export default compose(
    withRouter,
    reduxForm({
        form: 'signUp'
    })
)(SignUpForm);