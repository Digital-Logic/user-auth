import React from 'react';
import { Form, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { PasswordInput, required, minLengthSeven, conformPassword } from '../UI/form';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { authActions } from '../Store';

function ResetPassword({ handleSubmit, actions }) {

    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <Grid container spacing={8} direction="column">

                <PasswordInput
                    label="Password"
                    name="pwd"
                    validate={[required, minLengthSeven]}
                />

                <PasswordInput
                    label="Confirm Password"
                    name="confirmPwd"
                    validate={[required, minLengthSeven, conformPassword]}
                />
            </Grid>
        </Form>
    );

    function onSubmit(data, dispatch) {
        dispatch(authActions.resetPassword({ data, ...actions.onDispatch() }));
    }
}

ResetPassword.formName = "resetPassword";

ResetPassword.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};

export default compose(
    reduxForm({
        form: ResetPassword.formName
    })
)(ResetPassword);