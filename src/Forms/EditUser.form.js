import React, { useReducer, useEffect } from 'react';
import { Form, Input, Select, Checkbox, required } from '../UI/Forms';
import LockedButton from '../UI/LockedButton';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { Can } from '../Auth';

const ACTIONS = Object.freeze({
    FIRST_NAME: 'FIRST_NAME',
    LAST_NAME: 'LAST_NAME',
    ROLE: 'ROLE',
    ACCOUNT_VERIFIED: 'ACCOUNT_VERIFIED',
    ACCOUNT_DISABLED: 'DISABLED',
    TOGGLE_LOCKED: 'TOGGLE_LOCKED',
    MERGE: 'MERGE',
    REPLACE: 'REPLACE'
});

const initialState = {
    _id: '',
    firstName: {
        value: '',
        pristine: true
    },
    lastName: {
        value: '',
        pristine: true
    },
    role: {
        value: '',
        pristine: true
    },
    accountVerified: {
        value: '',
        pristine: true
    },
    disabled: {
        value: false,
        pristine: true
    },
    locked: true
};

function EditUser({ user, onSubmit }) {

    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
            type: ACTIONS.MERGE,
            userData: user // new user object
        });
    },[user]);

    return (
        <Grid container direction="column">
            <Grid container item justify="flex-end">
                <LockedButton
                    locked={state.locked}
                    onClick={() => dispatch({ type: ACTIONS.TOGGLE_LOCKED })}/>
            </Grid>

            <Grid item>
                <Form onSubmit={_onSubmit}>
                    <Input
                        label="First name"
                        name={ACTIONS.FIRST_NAME}
                        value={state.firstName.value}
                        onChange={onChange}
                        validate={[required()]}
                        disabled={ state.locked } />

                    <Input
                        label="Last Name"
                        name={ACTIONS.LAST_NAME}
                        value={state.lastName.value}
                        onChange={onChange}
                        validate={[required()]}
                        disabled={ state.locked } />

                    <Select
                        label="Role"
                        name={ACTIONS.ROLE}
                        validate={[required()]}
                        value={state.role.value}
                        onChange={onChange}
                        disabled={state.locked}>

                        <MenuItem value='USER'>User</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>

                    </Select>

                    <Checkbox
                        label="Account Disabled"
                        name={ACTIONS.ACCOUNT_DISABLED}
                        value={state.disabled.value}
                        onChange={onChange}
                        disabled={state.locked} />

                    <Checkbox
                        label="Account Verified"
                        name={ACTIONS.ACCOUNT_VERIFIED}
                        value={state.accountVerified.value}
                        onChange={onChange}
                        disabled={state.locked} />

                    <Grid container justify="flex-end">
                        <Button
                            disabled={ ['firstName', 'lastName', 'role', 'accountVerified', 'disabled']
                                .reduce( (pristine, key) => pristine && state[key].pristine, true) }
                            type="submit"
                            variant="outlined">Save Changes</Button>
                    </Grid>

                </Form>
            </Grid>

        </Grid>
    );

    function _onSubmit() {
        onSubmit({
            firstName: state.firstName,
            lastName: state.lastName,
            role: state.role,
            accountVerified: state.accountVerified,
            disabled: state.accountDisabled
        });
    }

    function onChange(event) {
        const { name, value } = event.target;
        dispatch({ type: name, value });
    }


    function reducer(state, { type, value, userData }) {
        switch(type) {
            case ACTIONS.FIRST_NAME:
                return {
                    ...state,
                    firstName: {
                        value,
                        pristine: value ===  ( user.firstName || initialState.firstName )
                    }
                };

            case ACTIONS.LAST_NAME:
                return {
                    ...state,
                    lastName: {
                        value,
                        pristine: value === ( user.lastName || initialState.lastName )
                    }
                };

            case ACTIONS.ROLE:
                return {
                    ...state,
                    role: {
                        value,
                        pristine: value === ( user.role || initialState.role )
                    }
                };

            case ACTIONS.ACCOUNT_VERIFIED:
                return {
                    ...state,
                    accountVerified: {
                        value,
                        pristine: value === ( user.accountVerified || initialState.accountVerified )
                    }
                };

            case ACTIONS.ACCOUNT_DISABLED:
                return {
                    ...state,
                    disabled: {
                        value,
                        pristine: value === ( typeof user.disabled !== 'boolean' ? user.disabled : initialState.disabled )
                    }
                };

            case ACTIONS.TOGGLE_LOCKED:
                return {
                    ...state,
                    locked: !state.locked
                };

            case ACTIONS.MERGE:
                return {
                    ...state,
                    // Walk through the following properties, update any that have changed and have not
                    // been modified by the end user.
                    ...['firstName', 'lastName', 'role', 'disabled', 'accountVerified' ].reduce( (newUser, key) => {
                        if (state[key].pristine && user[key])
                            newUser[key] = { value: user[key], pristine: true };
                        return newUser;
                    },{})
                };


            default:
                return state;
        }
    }
}

EditUser.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default EditUser;