import React, { PureComponent } from 'react';
import { Form, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { Input, Select, Checkbox, required } from '../UI/form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import LockedButton from '../UI/LockedButton';
import { initialize } from 'redux-form';
import { Can } from '../auth';
import { userActions } from '../Store';


const FORM_NAME = 'editUser';

class EditUser extends PureComponent {

    state = {
        locked: true
    };

    onToggleLock = this.onToggleLock.bind(this);
    onToggleLock() {
        this.setState(state => ({
            locked: !state.locked
        }));
    }

    componentDidMount() {
        const { user, dispatch } = this.props;
        dispatch(initialize(FORM_NAME, user));
    }

    componentDidUpdate(prevProps, prevState) {
        const { user, dispatch, pristine } = this.props;

        // Did the initial values for this form changes?
        if (Object.entries(user).reduce((diff, [key, value]) => {
            if (prevProps.user[key] !== value)
                return true;
            return diff;
        }, false)) {
            if (pristine)
                dispatch(initialize(FORM_NAME, user));
        }
    }

    onSubmit = this.onSubmit.bind(this);
    onSubmit(data, dispatch) {
        dispatch(userActions.updateUser(data))
            .then(response => {
                const { user } = this.props;
                dispatch(initialize(FORM_NAME, user));
                this.setState({
                    locked: true
                });
            });
    }

    render() {
        const { handleSubmit, submitting, pristine, user } = this.props;
        const { locked } = this.state;

        return (
            <Grid container direction="column">

                <Can I="update" on={user}>
                    <Grid container item justify="flex-end">
                        <LockedButton locked={locked} onClick={this.onToggleLock}>Edit</LockedButton>
                    </Grid>
                </Can>

                <Grid item>
                    <Form onSubmit={ handleSubmit(this.onSubmit) }>
                        <Grid container spacing={16} direction="column">

                            <Can I="read firstName" on={user}>
                                <Can I="update firstName" on={user} passThrough>
                                { can =>
                                     <Input
                                        label="First Name"
                                        name="firstName"
                                        disabled={!can || locked}
                                    />
                                }
                                </Can>
                            </Can>

                            <Can I="read lastName" on={user}>
                                <Can I="update lastName" on={user} passThrough>
                                { can =>
                                    <Input
                                        label="Last Name"
                                        name="lastName"
                                        disabled={!can || locked} />
                                }
                                </Can>
                            </Can>


                            <Can I="read role" on={user}>
                                <Can I="update role" on={user} passThrough>
                                { can =>
                                    <Select
                                        label="Role"
                                        name="role"
                                        validate={[required]}
                                        disabled={!can || locked}>
                                        <MenuItem value="USER">User</MenuItem>
                                        <MenuItem value="ADMIN">Admin</MenuItem>
                                    </Select>
                                }
                                </Can>
                            </Can>

                            <Can I="read accountVerified" on={user}>
                                <Can I="update accountVerified" on={user} passThrough>
                                {   can =>
                                    <Checkbox
                                        disabled={!can || locked}
                                        label="Account Disabled"
                                        name="disabled" />
                                }
                                </Can>
                            </Can>

                            <Can I="read disabled" on={user}>
                                <Can I="update disabled" on={user} passThrough>
                                {   can =>
                                    <Checkbox
                                        disabled={!can || locked}
                                        label="Account Verified"
                                        name="accountVerified" />
                                }
                                </Can>
                            </Can>

                            <Can I="update" on={user}>
                                <Grid item container justify="flex-end" alignItems="center">
                                    <Button disabled={ submitting || pristine} variant="outlined" type="submit">Save Changes</Button>
                                </Grid>
                            </Can>

                        </Grid>
                    </Form>
                </Grid>
            </Grid>
        );
    }

    static get propTypes() {
        return {
            handleSubmit: PropTypes.func.isRequired,
            submitting: PropTypes.bool.isRequired,
            user: PropTypes.object.isRequired
        };
    }
}

export default compose(
    reduxForm({
        form: FORM_NAME
    })
)(EditUser);