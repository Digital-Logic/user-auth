import React from 'react';
import { Form, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { Input, PasswordInput, required, isEmail, minLengthSeven } from '../UI/form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { ResetPasswordLink } from '../Routes/ResetPassword.route';
import { authActions } from '../Store';

function SignInForm({ handleSubmit, submitting }) {
    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <Grid container spacing={16} direction="column">
                <Input
                    label="Email Address"
                    name="email"
                    validate={[required, isEmail]}
                />

                <PasswordInput
                    label="Password"
                    name="pwd"
                    validate={[required, minLengthSeven]}
                />

                <Grid item container justify="space-between" alignItems="center">
                    <ResetPasswordLink size="small"/>
                    <Button disabled={submitting} variant="outlined" type="submit">Submit</Button>
                </Grid>
            </Grid>
        </Form>
    );
}

SignInForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

function onSubmit(formData, dispatch) {
    dispatch(authActions.signIn(formData));
}

export default compose(
    reduxForm({
        form: 'signIn'
    })
)(SignInForm);