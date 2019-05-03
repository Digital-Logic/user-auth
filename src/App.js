import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import applyTheme from './applyTheme';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ROUTES, Home, Profile, SignIn, SignUp, ResetPassword, NotFound } from './Routes';
import { Switch, Route, withRouter } from 'react-router-dom';
import AppBar from './Components/AppBar';
import { AppInitModel, STATES as MODEL_STATES } from './Models';
import { connect } from 'react-redux';
import { authActions } from './Store';
import queryString from 'query-string';

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


function App({ classes, isAuthenticated, id, getAuth, signOut, processToken, history, location }) {

    const [ authState, setAuthState ] = useState(MODEL_STATES.CLOSED);
    const [ modelContent, setModelContent ] = useState();

    // Initialize app
    useEffect(() => {
        // Create loading model
        setAuthState(MODEL_STATES.LOADING);
        // Process query string tokens
        const params = queryString.parse(location.search);


        Promise.all([
                getAuth(),
                processToken({ token: params.token, id, model: { state: authState, setState: setAuthState }})
            ])
            .then(([ authResponse, { closeModel }={}]) => {
                history.replace(location.path); // remove query params

                if (closeModel)
                    setAuthState(MODEL_STATES.CLOSED);
            });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); // This effect will run on mount only

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

            <AppInitModel
                state={authState}
                setState={setAuthState}
                content={modelContent}
                onLogin={() => history.push(ROUTES.SIGN_IN)}
                    />

        </div>
    );
}

function mapState(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        id: state.auth.id
    };
}

function mapDispatch(dispatch) {
    return {
        getAuth: () => dispatch(authActions.getAuth()),

        signOut: ({ model, history }) => {
            dispatch(authActions.signOut({ model }))
                // Redirect to home page on log out.
                .then(() => history.push(ROUTES.HOME));
        },

        processToken: ({ token, model }) =>
            dispatch(authActions.processQueryStringToken({ token, model }))
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
