import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withAuth } from '../Auth';
import EditUser from '../Forms/EditUser.form';
import { withModel, ProfileModel, STATES as MODEL_STATES } from '../Models';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { connect } from 'react-redux';
import { userActions } from '../Store';

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

function Profile({ className, classes, model, userID, getUser, updateUser, deleteUser, user, history }) {

    useEffect(() => {
        if (userID && userID.match(/^[0-9a-fA-F]{24}$/)) {
            getUser({ userID, model });

            model.actions.createActions({
                deleteUser: () => deleteUser({ userID, model}),
                redirect: path => history.push(path)
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
        updateUser: ({ user, model }) => dispatch(userActions.updateUser({ user, model })),
        deleteUser: (...args) => dispatch(userActions.deleteUser(...args))
    };
}

export default compose(
    withStyles(styles),
    withAuth(),
    connect(mapState, mapDispatch),
    withModel(ProfileModel)
)(Profile);
