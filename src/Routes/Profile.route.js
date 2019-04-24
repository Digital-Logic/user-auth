import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import User from '../Components/User';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withAuth } from '../auth';
import { connect } from 'react-redux';
import { userActions } from '../Store';

const styles = theme => ({
});

class Profile extends PureComponent {

    componentDidMount() {
        const { isAuthenticated, id, getUser } = this.props;
        if (isAuthenticated) {
            getUser(id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { isAuthenticated, id, getUser } = this.props;

        if (prevProps.isAuthenticating && isAuthenticated) {
            getUser(id);
        }
    }

    render() {
        const { className, classes, users, id, dispatch } = this.props;

        return (
            <Grid container direction="column" alignItems="center" justify="space-around" wrap="nowrap" spacing={8}>
                <Grid item>
                    <Typography align="center" gutterBottom variant="h1">Profile</Typography>
                </Grid>

                <Grid item className={classNames(className, classes.card) }>
                    <User user={users[id]} dispatch={dispatch}/>
                </Grid>
            </Grid>
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
            isAuthenticating: state.auth.isAuthenticating,
            id: state.auth.id,
            users: state.users
        };
    }

    static mapDispatch(dispatch) {
        return {
            getUser: (id) => dispatch(userActions.getUser(id)),
            dispatch
        };
    }
}



export default compose(
    withAuth(),
    withStyles(styles),
    connect(Profile.mapState, Profile.mapDispatch)
)(Profile);
