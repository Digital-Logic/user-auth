import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes';
import classNames from 'classnames';

const classes = theme => ({
    title: {
        textDecoration: 'none',
        fontSize: '1.75rem'
    },
    grow: {
        flexGrow: 1
    }
});

class ApplicationBar extends PureComponent {

    render() {
        const { classes, isAuthenticated, onLogout } = this.props;

        return (
            <AppBar position="fixed">
                <ToolBar>
                    <Typography
                        component={Link}
                        to={ROUTES.HOME}
                        className={classNames(classes.grow, classes.title)}
                        variant="h5"
                        color="inherit">User Auth</Typography>

                    { isAuthenticated ?
                        <Fragment>
                            <Button
                                to={ROUTES.PROFILE}
                                component={Link}>Profile</Button>

                            <Button onClick={onLogout}>Log out</Button>
                        </Fragment> :

                        <Fragment>
                            <Button
                                to={ROUTES.SIGN_IN}
                                component={Link}>Sign In</Button>

                            <Button
                                to={ROUTES.SIGN_UP}
                                component={Link}>Sign Up</Button>
                        </Fragment>
                    }

                </ToolBar>
            </AppBar>
        );
    }
    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired,
            isAuthenticated: PropTypes.bool.isRequired
        };
    }
}

export default compose(
    withStyles(classes)
)(ApplicationBar);