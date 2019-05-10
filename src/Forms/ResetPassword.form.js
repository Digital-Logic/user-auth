import React, { useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import { Form, Password, required, minLength, isEqualTo } from '../UI/Forms';
import Button from '@material-ui/core/Button';

const ACTIONS = Object.freeze({
    PWD: 'PWD',
    CONFIRM_PWD: 'CONFIRM_PWD'
});

function ResetPassword({ onSubmit, onCancel }) {

    const [{ pwd, confirmPwd}, dispatch] = useReducer(reducer, { pwd: '', confirmPwd: '' });

    return (
        <Form onSubmit={_onSubmit}>
            <Password
                label="Password"
                name={ACTIONS.PWD}
                value={pwd}
                onChange={onChange}
                validate={[required(), minLength(7)]}
                />
            <Password
                label="Confirm Password"
                name={ACTIONS.CONFIRM_PWD}
                value={confirmPwd}
                onChange={onChange}
                validate={[required(), isEqualTo(pwd)]}
                />

            <Grid container justify="space-between" alignItems="center">
                <Button onClick={onCancel}>cancel</Button>
                <Button
                    type="submit"
                    variant="outlined">Submit</Button>
            </Grid>
        </Form>
    );

    function onChange(event) {
        const { name, value } = event.target;
        dispatch({ type: name, value });
    }

    function _onSubmit() {
        onSubmit(pwd);
    }
}

function reducer(state, { type, value }) {
    switch(type) {
        case ACTIONS.PWD:
            return {
                ...state,
                pwd: value
            };
        case ACTIONS.CONFIRM_PWD:
            return {
                ...state,
                confirmPwd: value
            };
        default:
            return state;
    }
}

export default ResetPassword;