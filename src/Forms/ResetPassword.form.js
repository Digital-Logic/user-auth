import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Form, Input, isEmail, required } from '../UI/Forms';


function ResetPassword({ onSubmit, onClose }) {
    const [email, setEmail] = useState('');

    return (
        <Form onSubmit={_onSubmit}>
            <Input
                label="eMail Address"
                value={email}
                onChange={onChange}
                validate={[required(), isEmail()]}
                />

            <Grid container justify="flex-end">
                <Button type="submit" variant="outlined">Submit</Button>
            </Grid>
        </Form>
    );

    function  _onSubmit() {
        onSubmit({
            email
        });
    }

    function onChange(event) {
        const { value } = event.target;
        setEmail(value);
    }
}


export default ResetPassword;