import React, { Component } from 'react';
import compose from 'recompose/compose';
import applyTheme from './applyTheme';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ROUTES, Home, SignIn, SignUp, ResetPassword, Profile, NotFound } from './Routes';
import AppBar from './Components/ApplicationBar';
import { connect } from 'react-redux';
import { ModelManager } from './Models';
import { authActions } from './Store';
import queryString from 'query-string';

const classes = theme => ({
    wrapper: {
        overflow: 'hidden'
    },
    navSpacer: {
        ...theme.mixins.toolbar,
        marginBottom: theme.spacing.unit * 4
    },
    card: {
        width: '100%',
        maxWidth: 500
    }

});


class App extends Component {

    componentDidMount() {
        const { getAuth, processToken, history, location, id } = this.props;

        getAuth();

        const params = queryString.parse(this.props.location.search);

        if (params.token) {
            // a token is on the query string,
            // send the token to the back-end and remove it from the query string
            processToken({ token: params.token, id })
                .then(({ redirect }={}) => {

                    if (redirect)
                        history.push(redirect);
                    else history.replace( location.path );
                });
        }
    }

    onLogout = this.onLogout.bind(this);
    onLogout() {
        const { signOut, history } = this.props;

        signOut()
            .then(result => {
                history.push(ROUTES.HOME);
            });
    }

    render() {
        const { classes, isAuthenticated, models, dispatch } = this.props;
        return (
            <div className={classes.wrapper}>

                <AppBar
                    onLogout={this.onLogout}
                    isAuthenticated={isAuthenticated} />

                <div className={classes.navSpacer} />

                <Switch>
                    <Route path={ROUTES.SIGN_IN} render={(props) =>
                        <SignIn className={classes.card}
                            isAuthenticated={isAuthenticated} {...props}/> } />

                    <Route path={ROUTES.SIGN_UP} render={(props) =>
                        <SignUp className={classes.card} {...props}/> } />

                    <Route path={ROUTES.RESET_PASSWORD} render={(props) =>
                        <ResetPassword className={classes.card} {...props} />} />

                    <Route path={ROUTES.PROFILE} render={(props) =>
                        <Profile className={classes.card} {...props}/>} />

                    <Route exact path={ROUTES.HOME} render={(props) =>
                        <Home className={classes.card} {...props}/> } />

                    <Route path={'/'} component={NotFound} />

                </Switch>

                <ModelManager
                    models={models}
                    dispatch={dispatch}
                />

            </div>
        );
    }

    static get propTypes() {
        return {
            classes: PropTypes.object.isRequired
        };
    }

    static mapState(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated,
            id: state.auth.id,
            models: state.models
        };
    }

    static mapDispatch(dispatch) {
        return {
            getAuth: () => dispatch(authActions.getAuth()),
            signOut: () => dispatch(authActions.signOut()),
            processToken: (token) => dispatch(authActions.processQueryStringToken(token)),
            dispatch
        };
    }
}

export default compose(
    applyTheme,
    withStyles(classes),
    connect(App.mapState, App.mapDispatch),
    withRouter
)(App);
