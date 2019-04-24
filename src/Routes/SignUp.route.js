import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { SignUpForm } from '../Forms';
import { SignInLink } from './SignIn.route';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { ROUTES } from './index';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    card: {
    },
    grid: {
        padding: theme.spacing.unit
    }
});

function SignUp({className, classes}) {
    return (
        <Grid
            className={classes.grid}
            container
            direction="column"
            alignItems="center"
            justify="space-around"
            wrap="nowrap"
            spacing={8}>

            <Grid item>
                <Typography variant="h1" gutterBottom align="center">Sign Up</Typography>
            </Grid>
            <Grid item className={classNames(className, classes.card)}>
                <Card raised>
                    <CardContent>
                        <SignUpForm />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <SignInLink align="center"/>
            </Grid>
        </Grid>
    );
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
};

function SignUpLink(props) {
    return (
        <Typography {...props}>Don't have an account?
            <Button color="primary" to={ROUTES.SIGN_UP} component={Link}>Create one</Button>
        </Typography>
    );
}

export default compose(
    withStyles(styles)
)(SignUp);

export {
    SignUpLink,
    SignUp
};