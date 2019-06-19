import React, { useEffect, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Verified from '@material-ui/icons/VerifiedUser';
import Grid from '@material-ui/core/Grid';
import { withAuth } from '../Auth';
import EditUser from '../Forms/EditUser.form';
import { ModelContext, ChangePasswordModel, ChangePasswordFailed, ChangePasswordSuccess,
    ChangingPassword, ConfirmDeleteAccount, DeletingAccount, DeleteAccountSuccess, DeleteAccountFailed } from '../Models';
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

function Profile({ className, classes, model, userID, getUser, updateUser,
        deleteUser, changePassword, user, history, subscribeSocket }) {

    useEffect(subscribeSocket,[]);

    const { setState, createModel, STATES } = useContext(ModelContext);

    useEffect(() => {
        if (userID && userID.match(/^[0-9a-fA-F]{24}$/)) {

            getUser({ userID, setState, STATES });

            createModel({
                state: 'CHANGE_PASSWORD',
                model: ChangePasswordModel,
                actions: {
                    onChangePassword: changePassword,
                    onCancel: ({ setState, STATES }) => setState(STATES.CLOSED),
                    onClose: () => {}
                }
            },{
                state: 'CHANGE_PASSWORD_SUCCESS',
                model: ChangePasswordSuccess
            },{
                state: "CHANGE_PASSWORD_FAILED",
                model: ChangePasswordFailed
            },{
                state: 'CHANGING_PASSWORD',
                model: ChangingPassword,
                actions: {
                    onClose: ({ state, setState, STATES }) => {
                        if(state !== 'CHANGING_PASSWORD')
                            setState(STATES.CLOSED);
                    }
                }
            },{
                state: 'CONFIRM_DELETE_ACCOUNT',
                model: ConfirmDeleteAccount,
                actions: {
                    onDeleteUser: ({ state, setState, STATES }) => deleteUser({ state, setState, STATES, userID, history})
                }
            },{
                state: 'DELETING_ACCOUNT',
                model: DeletingAccount,
                actions: {
                    onClose: () => {}
                }
            },{
                state: 'DELETE_ACCOUNT_SUCCESS',
                model: DeleteAccountSuccess
            },{
                state: 'DELETE_ACCOUNT_FAILED',
                model: DeleteAccountFailed
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
                                    onSubmit={user => updateUser({ user, setState, STATES })} />
                            </Grid>
                            <Grid item container justify="space-between">

                                <Button
                                    className={classes.deleteBtn}
                                    onClick={() => setState(STATES.CONFIRM_DELETE_ACCOUNT)}
                                    variant="outlined"><DeleteIcon />Delete Account</Button>

                                <Button
                                    disabled={ !user.authTypes || user.authTypes.indexOf('PWD') === -1}
                                    onClick={() => setState(STATES.CHANGE_PASSWORD)}
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
        getUser: (args) => dispatch(userActions.getUser(args)),
        updateUser: (args) => dispatch(userActions.updateUser(args)),
        deleteUser: (args) => dispatch(userActions.deleteUser(args)),
        changePassword: (args) => dispatch(authActions.changePassword(args)),
        subscribeSocket: () => userActions.subscribeUserSocket(dispatch)
    };
}

export default compose(
    withStyles(styles),
    withAuth(),
    connect(mapState, mapDispatch)
)(Profile);
