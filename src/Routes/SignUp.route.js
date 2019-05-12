import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignUpForm from '../Forms/SignUp.form';
import { SignUpModel, withModel } from '../Models';
import { ROUTES } from '../Routes';
import { SignInLink } from './SignIn.route';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';

function SignUp({ className, signUp, model, history }) {

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

        </Grid>
    );

    function onSubmit(userData) {
        // Create a redirect action, so the model can redirect the user.
        model.actions.createActions({
            redirect: path => history.push(path)
        });

        signUp({ userData, model })
            .then(({clearForm}={}) => {
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

export default compose(
    withModel(SignUpModel)
)(SignUp);


export {
    SignUpLink
};