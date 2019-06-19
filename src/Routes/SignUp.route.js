import React, { useState, useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignUpForm from '../Forms/SignUp.form';
import { SignUpSuccess, SignUpFailed, DuplicateAccount, CreatingAccount, ModelContext } from '../Models';
import { ROUTES } from '../Routes';
import { SignInLink } from './SignIn.route';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function SignUp({ className, signUp, history }) {

    const [ formKey, setFormKey ] = useState(1);
    const { setState, createModel, STATES } = useContext(ModelContext);

    // Create signup models
    useEffect(() => {
        createModel({
            state: 'SIGN_UP_SUCCESS',
            model: SignUpSuccess
        },{
            state: 'SIGN_UP_FAILED',
            model: SignUpFailed
        },{
            state: 'CREATING_ACCOUNT',
            model: CreatingAccount,
            actions: {
                onClose: () => {}
            }
        },{
            state: 'DUPLICATE_ACCOUNT',
            model: DuplicateAccount,
            actions: {
                onLogin: ({ setState, STATES }) => {
                    history.push(ROUTES.SIGN_IN);
                    setState(STATES.CLOSED);
                }
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

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
        signUp({ userData, setState, STATES, clearForm, history });
    }

    function clearForm() {
        setFormKey(cur => cur + 1);
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

export default SignUp;


export {
    SignUpLink
};