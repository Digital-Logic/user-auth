import React from 'react';
import { Form, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { PasswordInput, required, minLengthSeven, BuildValidator } from '../UI/form';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { authActions } from '../Store';


const confirmNewPwd = BuildValidator.equalTo('newPassword');

function ChangePassword({ handleSubmit, actions }) {
    return (
        <Form onSubmit={ handleSubmit(onSubmit) }>
            <Grid container spacing={8} direction="column">

                <PasswordInput
                    label="Current Password"
                    name="password"
                    validate={[required, minLengthSeven]}
                />


                <PasswordInput
                    label="New Password"
                    name="newPassword"
                    validate={[required, minLengthSeven]}
                />

                <PasswordInput
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    validate={[required, minLengthSeven, confirmNewPwd]}
                />
            </Grid>
        </Form>
    );

    function onSubmit(data, dispatch) {
        dispatch(authActions.changePassword({ data, ...actions.onDispatch() }));
    }
}

ChangePassword.formName = "changePassword";

ChangePassword.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
};




export default compose(
    reduxForm({
        form: ChangePassword.formName
    })
)(ChangePassword);