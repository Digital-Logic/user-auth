import React, { useReducer } from 'react';
import { Form, Input, Password, required, isEmail, minLength, isEqualTo } from '../UI/Forms';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const ACTIONS = Object.freeze({
    EMAIL: 'EMAIL',
    FIRST_NAME: 'FIRST_NAME',
    LAST_NAME: 'LAST_NAME',
    PWD: 'PWD',
    CONFIRM_PWD: 'CONFIRM_PWD'
});

const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    pwd: '',
    confirmPwd: ''
};

function SignUpForm({ onSubmit }) {

    const [{ email, firstName, lastName, pwd, confirmPwd }, dispatch] = useReducer(reducer, initialState);

    return (
        <Form onSubmit={_onSubmit}>
            <Input
                label="eMail Address"
                name={ACTIONS.EMAIL}
                value={email}
                onChange={onChange}
                validate={[required(), isEmail()]}
                />

            <Input
                label="First Name"
                name={ACTIONS.FIRST_NAME}
                value={firstName}
                onChange={onChange}
                validate={[required()]}
                />

            <Input
                label="Last Name"
                name={ACTIONS.LAST_NAME}
                value={lastName}
                onChange={onChange}
                validate={[required()]}
                />

            <Password
                label="Password"
                name={ACTIONS.PWD}
                value={pwd}
                onChange={onChange}
                validate={[required(), minLength(7)]} />

            <Password
                label="Confirm Password"
                name={ACTIONS.CONFIRM_PWD}
                value={confirmPwd}
                onChange={onChange}
                validate={[required(), isEqualTo(pwd)]}
                />

            <Grid container justify="flex-end">
                <Button variant="outlined" type="submit">Submit</Button>
            </Grid>
        </Form>
    );

    function onChange(event) {
        const { name, value } = event.target;
        dispatch({
            type: name,
            value
        });
    }

    function _onSubmit() {
        onSubmit({
            email,
            firstName,
            lastName,
            pwd
        });
    }
}

function reducer(state, { type, value }) {
    switch(type) {
        case ACTIONS.EMAIL:
            return {
                ...state,
                email: value
            };
        case ACTIONS.FIRST_NAME:
            return {
                ...state,
                firstName: value
            };
        case ACTIONS.LAST_NAME:
            return {
                ...state,
                lastName: value
            };
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

export default SignUpForm;
