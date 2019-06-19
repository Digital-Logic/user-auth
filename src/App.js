import React, { useEffect, useContext } from 'react';
import compose from 'recompose/compose';
import applyTheme from './applyTheme';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ROUTES, Home, Profile, SignIn, SignUp, ResetPassword, NotFound } from './Routes';
import { Switch, Route, withRouter } from 'react-router-dom';
import AppBar from './Components/AppBar';
import { withModelManager, ModelContext, SignOut } from './Models';
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


function App({ classes, isAuthenticated, userID, getAuth, processQueryString,
        signOut, signUp, sendResetPassword, getUser, history, location, socketSubscribe }) {


    useEffect(socketSubscribe, []);

    const { setState, state, STATES, createModel } = useContext(ModelContext);

    // Initialize app
    useEffect(() => {
        // Process query string tokens
        const params = queryString.parse(location.search);

        setState(STATES.LOADING);

        createModel({
            state: 'LOG_OUT',
            model: SignOut
        });

        Promise.all([
            getAuth(),
            processQueryString({ params, setState, STATES, createModel, userID, path: location.pathname })
        ])
        .then(([authResponse, tokenResponse = {}]) => {
            if (tokenResponse.closeModel)
                setState(STATES.CLOSED);

            if (tokenResponse.redirect)
                history.replace(tokenResponse.redirect);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); // This effect will run on mount only

    return (
        <div className={classes.root}>
            <AppBar
                isAuthenticated={isAuthenticated}
                signOut={ () => signOut({ setState, STATES, history})}
                />

            <div className={classes.spacer} />

            <Switch>
                <Route exact path={ROUTES.HOME} render={(props) =>
                    <Home className={classes.card} {...props} />} />

                <Route path={ROUTES.OAUTH}
                    render={props => <Home className={classes.card} {...props} />} />

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
        processQueryString: (args) => dispatch(authActions.processQueryString(args)),
        socketSubscribe: () => authActions.socketSubscribe(dispatch)
    };
}


App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    applyTheme,
    withStyles(styles),
    withRouter,
    withModelManager(),
    connect(mapState, mapDispatch)
)(App);
