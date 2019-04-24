import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import compose from 'recompose/compose';
import EditUser from '../Forms/EditUser.form';
import Verified from '@material-ui/icons/VerifiedUser';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { modelActions } from '../Store';
import { Can } from '../auth';

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


function User({classes, user, dispatch }) {
    return (
        <Card>
            <CardHeader
                avatar={ <Avatar className={classes.avatar}>U</Avatar> }
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
                        <EditUser  user={ user }/>
                    </Grid>

                    <Grid item container spacing={16} justify="space-between">
                        <Can I="delete" on={ user }>
                            <Grid item>
                                <Button
                                    className={classes.deleteBtn}
                                    variant="outlined"
                                    onClick={onDeleteUser}><DeleteIcon />Delete Account</Button>
                            </Grid>
                        </Can>

                        <Can I="update password" on={ user }>
                            <Grid item>
                                <Button
                                    onClick={onChangePassword}
                                    variant="outlined">Change Password</Button>
                            </Grid>
                        </Can>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );

    function onDeleteUser() {
        dispatch(modelActions.createConformModel({
            title: 'Delete User Account',
            message: 'This action cannot be undone.',
            actions: {
                onDeleteUser: {
                    _id: user._id
                }
            }
        }));
    }

    function onChangePassword() {
        dispatch(modelActions.createChangePasswordModel({
            user
        }));
    }
}


User.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

User.defaultProps = {
    user: {}
};

export default compose(
    withStyles(styles)
)(User);