import React, { useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Form, Password, required, minLength, isEqualTo } from '../UI/Forms';

const ACTIONS = Object.freeze({
    PWD: 'PWD',
    NEW_PWD: 'NEW_PWD',
    CONFIRM_NEW_PWD: 'CONFIRM_NEW_PWD'
});

const initialState = {
    pwd: '',
    newPwd: '',
    confirmNewPwd: ''
};

function ChangePassword({ onSubmit, onCancel }) {

    const [{ pwd, newPwd, confirmNewPwd }, dispatch ] = useReducer(reducer, initialState);

    return (
        <Form onSubmit={_onSubmit}>
            <Password
                label="Current Password"
                onChange={onChange}
                name={ACTIONS.PWD}
                value={pwd}
                validate={[required(), minLength(7)]}
                />

            <Password
                label="New Password"
                onChange={onChange}
                name={ACTIONS.NEW_PWD}
                value={newPwd}
                validate={[required(), minLength(7)]}
                />
            <Password
                label="Confirm Password"
                onChange={onChange}
                value={confirmNewPwd}
                name={ACTIONS.CONFIRM_NEW_PWD}
                validate={[required(), minLength(7), isEqualTo(newPwd)]}
                />

            <Grid container justify="space-between">
                <Button onClick={onCancel}>Cancel</Button>
                <Button
                    type="submit"
                    variant="outlined">Change Password</Button>

            </Grid>
        </Form>
    );

    function _onSubmit() {
        onSubmit({ pwd, newPwd });
    }

    function onChange(event) {
        const { name, value } = event.target;
        dispatch({
            type: name,
            value
        });
    }
}


function reducer( state, { type, value }) {
    switch(type) {
        case ACTIONS.PWD:
            return {
                ...state,
                pwd: value
            };

        case ACTIONS.NEW_PWD:
            return {
                ...state,
                newPwd: value
            };

        case ACTIONS.CONFIRM_NEW_PWD:
            return {
                ...state,
                confirmNewPwd: value
            };

        default:
            return state;
    }
}

export default ChangePassword;