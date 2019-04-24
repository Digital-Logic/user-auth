import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { SignInForm } from '../Forms';
import Button from '@material-ui/core/Button';
import { ROUTES } from './index';
import { Link } from 'react-router-dom';
import { SignUpLink } from './SignUp.route';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
    card: {
    }
});

function SignIn({ className, classes, location, isAuthenticated,  ...rest}) {

    return (

        isAuthenticated ?
            <Redirect to={
                location.state && location.state.from ?
                    location.state.from.pathname : ROUTES.PROFILE } /> :

        <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-around"
            wrap="nowrap"
            spacing={8}
            >

            <Grid item>
                <Typography align="center" gutterBottom variant="h1">Sign In</Typography>
            </Grid>

            <Grid item className={classNames(className, classes.card) }>
                <Card raised>
                    <CardContent>
                        <SignInForm />
                    </CardContent>
                </Card>
            </Grid>

            <Grid item>
                <SignUpLink align="center" />
            </Grid>
        </Grid>
    );
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired
};

function SignInLink(props) {
    return (
        <Typography {...props}>Already have an account?
            <Button color="primary" to={ROUTES.SIGN_IN} component={Link}>Sign in</Button>
        </Typography>
    );
}

export default compose(
    withStyles(styles)
)(SignIn);

export {
    SignInLink
};