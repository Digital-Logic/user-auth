import React, { useEffect, useState } from 'react';
import compose from 'recompose/compose';
import applyTheme from './applyTheme';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ROUTES, Home, Profile, SignIn, SignUp, ResetPassword, NotFound } from './Routes';
import { Switch, Route, withRouter } from 'react-router-dom';
import AppBar from './Components/AppBar';
import { AppInitModel, STATES as MODEL_STATES, withModel } from './Models';
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


function App({ classes, isAuthenticated, userID, createModel, getAuth, signOut, history, location,
        processToken, sendEmailVerification, sendResetPassword }) {

    // Initialize app
    useEffect(() => {
        // Process query string tokens
        const params = queryString.parse(location.search);


        // Create loading model
        createModel( model => {
            model.actions.setState(MODEL_STATES.LOADING);

            model.actions.createActions({
                redirect: path => {
                    history.push(path); // Redirect to url
                    model.actions.setState(MODEL_STATES.CLOSED); // close model
                },
                onClose: () => {
                    if (model.state !== MODEL_STATES.LOADING)
                        model.actions.setState(MODEL_STATES.CLOSED);
                }
            });

            Promise.all([
                getAuth(),
                processToken({ token: params.token, userID, model })
            ])
            .then(([authResponse, tokenResponse ])=> {
               // model.actions.setState(MODEL_STATES.SUCCESS);
                //model.actions.setState(MODEL_STATES.CLOSED);
                //console.log(model);
            });
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); // This effect will run on mount only

    return (
        <div className={classes.root}>
            <AppBar
                isAuthenticated={isAuthenticated}
                signOut={ signOut }
                />

            <div className={classes.spacer} />

            <Switch>
                <Route exact path={ROUTES.HOME} render={(props) => <Home className={classes.card} {...props} />} />
                <Route path={ROUTES.PROFILE} render={(props) => <Profile className={classes.card} {...props} />} />
                <Route path={ROUTES.SIGN_IN} render={(props) => <SignIn className={classes.card} {...props} />} />
                <Route path={ROUTES.SIGN_UP} render={(props) => <SignUp className={classes.card} {...props} />} />
                <Route path={ROUTES.RESET_PASSWORD} render={(props) => <ResetPassword className={classes.card} {...props} /> } />
                <Route path="/" render={(props) => <NotFound className={classes.card} {...props} />} />
            </Switch>

            {/* <AppInitModel
                tasks={{
                    tasks: modelTask,
                    setTask: setModelTask
                }}

                actions={{
                    sendEmailVerification: ( args ) => sendEmailVerification(args),
                    sendResetPassword: (args) => sendResetPassword(args)
                }}
                onLogin={() => history.push(ROUTES.SIGN_IN) }
                onClose={() => {
                    if (authState !== MODEL_STATES.LOADING &&
                            authState !== MODEL_STATES.RESET_PASSWORD) {
                                setAuthState(MODEL_STATES.CLOSED);
                            }
                }}
                /> */}

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

        signOut: ({ model, history }) => {
            dispatch(authActions.signOut({ model }))
                // Redirect to home page on log out.
                .then(() => history.push(ROUTES.HOME));
        },

        processToken: (args) => dispatch(authActions.processQueryStringToken(args)),
        sendResetPassword: (args) => dispatch(authActions.sendResetPasswordEmail(args)),
        sendEmailVerification: (args) => dispatch(authActions.sendEmailVerification(args))
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
