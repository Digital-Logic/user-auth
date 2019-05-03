import React, { Fragment } from 'react';
import AppBarComponent from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';

const styles = theme => ({
    title: {
        fontWeight: 500,
        flexGrow: 1,
        textDecoration: 'none',
        cursor: 'default'
    }
});

function AppBar({ classes, isAuthenticated, signOut }) {
    return (
        <AppBarComponent position="fixed">
            <Toolbar color="primary">
                <Typography variant="h4" to={ROUTES.HOME} component={Link} className={classes.title}>User Auth</Typography>
                {
                    isAuthenticated ? (
                        <Fragment>
                            <Button to={ROUTES.PROFILE} component={Link}>Profile</Button>
                            <Button onClick={signOut}>Logout</Button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button to={ROUTES.SIGN_IN} component={Link}>Sign in</Button>
                            <Button to={ROUTES.SIGN_UP} component={Link}>Sign up</Button>
                        </Fragment>
                    )
                }
            </Toolbar>
        </AppBarComponent>
    );
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default compose(
    withStyles(styles)
)(AppBar);