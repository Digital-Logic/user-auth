import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import applyTheme from './applyTheme';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ROUTES, Home, Profile, SignIn, SignUp, ResetPassword, NotFound } from './Routes';
import { Switch, Route, withRouter } from 'react-router-dom';
import AppBar from './Components/AppBar';
import { LoadingModel, STATES as MODEL_STATES } from './Models';
import { connect } from 'react-redux';
import { authActions } from './Store';

const styles = theme => ({
    root: {
        overflow: 'hidden',
        padding: theme.spacing.unit
    },
    card: {
        width: '100%',
        maxWidth: 500
    },
    spacer: {
        ...theme.mixins.toolbar,
        marginBottom: theme.spacing.unit * 2
    }
});

function App({ classes, isAuthenticated, getAuth, signOut, history }) {

    const [ authState, setAuthState ] = useState(MODEL_STATES.CLOSED);
    const [ modelContent, setModelContent ] = useState();

    // Initialize logged in user
    useEffect(() => {
        getAuth({ state: authState, setState: setAuthState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); // This effect will run once, and only once.

    return (
        <div className={classes.root}>
            <AppBar
                isAuthenticated={isAuthenticated}
                signOut={() => signOut({ model: { state: authState, setState: setAuthState, setContent: setModelContent}, history })}
                />

            <div className={classes.spacer} />

            <Switch>
                <Route exact path={ROUTES.HOME} render={(props) => <Home className={classes.card} {...props} />} />
                <Route path={ROUTES.PROFILE} render={(props) => <Profile className={classes.card} {...props} />} />
                <Route path={ROUTES.SIGN_IN} render={(props) => <SignIn className={classes.card} {...props} />} />

                <Route path={ROUTES.SIGN_UP} render={(props) =>
                    <SignUp
                        className={classes.card}
                        {...props} />}
                        />

                <Route path={ROUTES.RESET_PASSWORD} render={(props) => <ResetPassword className={classes.card} {...props} />} />

                <Route path="/" render={(props) => <NotFound className={classes.card} {...props} />} />
            </Switch>

            <LoadingModel
                state={authState}
                setState={setAuthState}
                content={modelContent}
                    />

        </div>
    );
}

function mapState(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
}

function mapDispatch(dispatch) {
    return {
        getAuth: (model) => dispatch(authActions.getAuth({ model })),

        signOut: ({ model, history }) => {
            dispatch(authActions.signOut({ model }))
                // Redirect to home page on log out.
                .then(() => history.push(ROUTES.HOME));
        }
    };
}


App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    applyTheme,
    withStyles(styles),
    withRouter,
    connect(mapState, mapDispatch)
)(App);
