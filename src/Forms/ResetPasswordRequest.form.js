import React from 'react';
import { Form, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { Input, required, isEmail } from '../UI/form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { authActions } from '../Store';

function ResetPassword({ handleSubmit, submitting }) {
    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <Grid container spacing={24} direction="column">

                <Input
                    label="Email Address"
                    name="email"
                    validate={[required, isEmail]}
                />

                <Grid container item justify="flex-end">
                    <Button disabled={submitting} variant="outlined" type="submit">Submit</Button>
                </Grid>
            </Grid>
        </Form>
    );
}

ResetPassword.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

function onSubmit(formData, dispatch) {
    dispatch(authActions.sendResetPasswordEmail(formData));
}

export default compose(
    reduxForm({
        form: 'resetPasswordRequest'
    })
)(ResetPassword);