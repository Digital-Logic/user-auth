import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Verified from '@material-ui/icons/VerifiedUser';
import Grid from '@material-ui/core/Grid';
import { withAuth } from '../Auth';
import EditUser from '../Forms/EditUser.form';
import { withModel, ProfileModel, STATES as MODEL_STATES } from '../Models';
import compose from 'recompose/compose';
import IdentityIcon from '@material-ui/icons/PermIdentity';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { connect } from 'react-redux';
import { userActions, authActions } from '../Store';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary
    },
    title: {
        fontSize: '1.25rem'
    },
    verifiedIcon: {
        color: theme.palette.background.default
    },
    verifiedAccount: {
        color: theme.palette.text.primary
    },
    deleteBtn: {
        borderColor: theme.palette.error.main,
        color: theme.palette.text.secondary,
        '& svg': {
            marginRight: theme.spacing.unit
        }
    }
});

function Profile({ className, classes, model, userID, getUser, updateUser, deleteUser, changePassword, user, history }) {

    useEffect(() => {
        if (userID && userID.match(/^[0-9a-fA-F]{24}$/)) {
            getUser({ userID, model });

            model.actions.createActions({
                deleteUser: () => deleteUser({ userID, model}),
                redirect: path => history.push(path),
                onCancel: () => model.actions.setState(MODEL_STATES.CLOSED),
                onClose: model => {
                    if (model.state !== MODEL_STATES.LOADING &&
                            model.state !== MODEL_STATES.CHANGE_PASSWORDS_LOADING &&
                            model.state !== MODEL_STATES.CHANGE_PASSWORDS_FORM &&
                            model.state !== MODEL_STATES.SIGN_OUT &&
                            model.state !== MODEL_STATES.CLOSED )
                        model.actions.setState(MODEL_STATES.CLOSED);
                },
                changePassword: (arg) => changePassword(arg)
            });
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userID]);


    return (
        <Grid container direction="column" alignItems="center" spacing={16}>
            <Grid item>
                <Typography variant="h3" align="center">Profile</Typography>
            </Grid>
            <Grid item className={className}>
                <Card raised>
                    <CardHeader
                        avatar={ <Avatar className={classes.avatar}><IdentityIcon size="large"/></Avatar> }
                        title={ user.email }
                        subheader={`Account created: ${new Date(user.createdAt).toLocaleDateString()}`}
                        classes={{ title: classes.title }}
                        action={
                            <Verified fontSize="small" className={classNames( classes.verifiedIcon, {
                                [classes.verifiedAccount]: user.accountVerified
                            })} />
                        }
                    />

                    <CardContent>
                        <Grid container direction="column" spacing={16}>
                            <Grid item>
                                <EditUser
                                    user={user}
                                    onSubmit={user => updateUser({ user, model })} />
                            </Grid>
                            <Grid item container justify="space-between">

                                <Button
                                    className={classes.deleteBtn}
                                    onClick={() => model.actions.setState(MODEL_STATES.CONFIRM_DELETE_USER)}
                                    variant="outlined"><DeleteIcon />Delete Account</Button>

                                <Button
                                    disabled={ !user.authTypes || user.authTypes.indexOf('PWD') === -1}
                                    onClick={() => model.actions.setState(MODEL_STATES.CHANGE_PASSWORDS_FORM)}
                                    variant="outlined">Change Password</Button>
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

function mapState(state) {
    return {
        userID: state.auth.id,
        user: state.user[state.auth.id] || {}
    };
}

function mapDispatch(dispatch) {
    return {
        getUser: ({ userID, model }) => dispatch(userActions.getUser({ userID, model })),
        updateUser: (args) => dispatch(userActions.updateUser(args)),
        deleteUser: (args) => dispatch(userActions.deleteUser(args)),
        changePassword: (args) => dispatch(authActions.changePassword(args))
    };
}

export default compose(
    withStyles(styles),
    withAuth(),
    connect(mapState, mapDispatch),
    withModel(ProfileModel)
)(Profile);
