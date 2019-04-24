import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ResetPasswordRequestForm } from '../Forms';
import Button from '@material-ui/core/Button';
import { ROUTES } from './index';
import { Link } from 'react-router-dom';
import { SignInLink } from './SignIn.route';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
    card: {
    }
});

function ResetPassword({ className, classes}) {
    return (
        <Grid container justify="space-between" alignItems="center" direction="column" spacing={8}>
            <Grid item>
                <Typography align="center" gutterBottom variant="h1">Reset Password</Typography>
            </Grid>
            <Grid item className={classNames(className, classes.card)}>
                <Card raised>
                    <CardContent>
                        <ResetPasswordRequestForm />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item>
                <SignInLink align="center" />
            </Grid>
        </Grid>
    );
}

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired
};

function ResetPasswordLink(props) {
    return (
        <Typography style={{ fontSize: '0.7rem'}} {...props}>Forgot your password? <br />
            <Button color="primary" to={ROUTES.RESET_PASSWORD} component={Link}>Reset Password</Button>
        </Typography>
    );
}

export default compose(
    withStyles(styles)
)(ResetPassword);

export {
    ResetPasswordLink
};
