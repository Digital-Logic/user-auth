import React, { useEffect } from 'react';
import compose from 'recompose/compose';
import applyTheme from './applyTheme';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ROUTES, Home, Profile, SignIn, SignUp, ResetPassword, NotFound } from './Routes';
import { Switch, Route, withRouter } from 'react-router-dom';
import AppBar from './Components/AppBar';
import { AppInitModel, STATES as MODEL_STATES, withModel } from './Models';
import { connect } from 'react-redux';
import { authActions, userActions } from './Store';
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


function App({ classes, isAuthenticated, userID, model, getAuth, processQueryString,
        signOut, signUp, sendResetPassword, getUser, history, location }) {

    // Initialize app
    useEffect(() => {
        // Process query string tokens
        const params = queryString.parse(location.search);

        model.actions.createActions({
            redirect: path => {
                history.push(path); // Redirect to url
            },
            // Override onClose action so the user does not accidentally close model during
            // password reset,
            onClose: model => {
                if (model.state !== MODEL_STATES.LOADING &&
                        model.state !== MODEL_STATES.SIGN_OUT &&
                        model.state !== MODEL_STATES.RESET_PASSWORD &&
                        model.state !== MODEL_STATES.CLOSED )
                    model.actions.setState(MODEL_STATES.CLOSED);
            },
            onCancel: model => {
                model.actions.setState(MODEL_STATES.CLOSED);
            }
        });

        model.actions.setState(MODEL_STATES.LOADING);

        Promise.all([
            getAuth(),
            processQueryString({ params, userID, model })
        ])
        .then(([authResponse, tokenResponse={}])=> {
            if ( tokenResponse.closeModel )
                model.actions.setState(MODEL_STATES.CLOSED);

            // Clear query strings
           // history.replace(location.path);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); // This effect will run on mount only

    return (
        <div className={classes.root}>
            <AppBar
                isAuthenticated={isAuthenticated}
                signOut={ () => signOut({ model }) }
                />

            <div className={classes.spacer} />

            <Switch>
                <Route exact path={ROUTES.HOME} render={(props) =>
                    <Home className={classes.card} {...props} />} />

                <Route path={ROUTES.PROFILE} render={(props) =>
                    <Profile className={classes.card} {...props} />} />

                <Route path={ROUTES.SIGN_IN} render={(props) =>
                    <SignIn className={classes.card} {...props} />} />

                <Route path={ROUTES.SIGN_UP} render={(props) =>
                    <SignUp className={classes.card}
                        signUp={signUp} {...props} />} />

                <Route path={ROUTES.RESET_PASSWORD} render={(props) =>
                    <ResetPassword className={classes.card} {...props}
                        sendResetPassword={sendResetPassword} /> } />

                <Route path="/" render={(props) =>
                    <NotFound className={classes.card} {...props} />} />
            </Switch>
        </div>
    );
}

function mapState(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userID: state.auth.id
    };
}

function mapDispatch(dispatch) {
    return {
        getAuth: () => dispatch(authActions.getAuth()),
        signOut: (...args) => dispatch(authActions.signOut(...args)),
        signUp: (...args) => dispatch(authActions.signUp(...args)),
        sendResetPassword: (...args) => dispatch(authActions.sendResetPasswordEmail(...args)),
        processQueryString: (args) => dispatch(authActions.processQueryString(args))
    };
}


App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    applyTheme,
    withStyles(styles),
    withRouter,
    withModel(AppInitModel),
    connect(mapState, mapDispatch)
)(App);
