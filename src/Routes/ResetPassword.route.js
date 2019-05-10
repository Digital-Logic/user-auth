import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SendResetPasswordForm from '../Forms/SendResetPasswordEmail.form';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';
import { ResetPasswordModel, withModel } from '../Models'
import { SignUpLink } from './SignUp.route'
import compose from 'recompose/compose';

function ResetPassword({ model, className, resetPassword, history }) {

    const [formKey, setFormKey ] = useState(1);

    return (
        <Grid container direction="column" alignItems="center" spacing={16}>
            <Grid item>
                <Typography variant="h3" align="center">Reset Password</Typography>
            </Grid>
            <Grid item className={className}>
                <Card raised>
                    <CardContent>
                        <SendResetPasswordForm
                            onSubmit={_onSubmit}
                            key={ formKey } />

                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <SignUpLink />
            </Grid>

            {/* <ResetPasswordModel
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
                /> */}
        </Grid>
    );

    function _onSubmit(userData) {
        resetPassword({ userData, model })
            .then(() => {
                setFormKey(formKey + 1);
            });

        // setUserData(userData);
        // resetPassword({ userData, model: { setState, setErrorMessage }})
        //     .then(() => {
        //         setFormKey(formKey + 1);
        //     });
    }
}



function ResetPasswordLink() {
    return (
        <Typography variant="body2" align="left">Forgot your password? <br />
            <Button
                to={ROUTES.RESET_PASSWORD}
                component={Link}
                color="primary"
            >Reset Password</Button>
        </Typography>
    );
}

export default compose(
    withModel( ResetPasswordModel )
)(ResetPassword);

export {
    ResetPasswordLink
};