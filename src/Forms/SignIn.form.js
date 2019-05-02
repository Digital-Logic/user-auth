import React, { useReducer } from 'react';
import Button from '@material-ui/core/Button';
import { Form, Input, Password, isEmail, minLength, required } from '../UI/Forms';
import Grid from '@material-ui/core/Grid';

const ACTIONS = Object.freeze({
    EMAIL: 'EMAIL',
    PWD: 'PWD'
});

const initialState = {
    email: '',
    pwd: ''
};


function SignIn({ onSubmit }) {

    const [{ email, pwd }, dispatch ] = useReducer(reducer, initialState);

    return (
        <Form onSubmit={_onSubmit}>

            <Input
                label="eMail"
                value={email}
                name={ACTIONS.EMAIL}
                onChange={onChange}
                validate={[ required(), isEmail() ]}
                />

            <Password
                label="Password"
                value={pwd}
                name={ACTIONS.PWD}
                onChange={onChange}
                validate={[required(), minLength(7) ]}
                />

            <Grid container justify="flex-end">
                <Button variant="outlined" type="submit">Submit</Button>
            </Grid>
        </Form>
    );

    function onChange(event) {
        const { name, value } = event.target;
        dispatch({ type: name, value });
    }
    function _onSubmit() {

        onSubmit({
            email,
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
        case ACTIONS.PWD:
            return {
                ...state,
                pwd: value
            };
        default:
            return state;
    }
}

export default SignIn;