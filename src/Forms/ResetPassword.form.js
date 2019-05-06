import React, { useReducer } from 'react';
import Grid from '@material-ui/core/Grid';
import { Form, Password, required, minLength } from '../UI/Forms';
import Button from '@material-ui/core/Button';

function ResetPassword({ onSubmit, onClose }) {
    return (
        <Form>
            <Password
                label="Password"
                />
            <Password
                label="Confirm Password"
                />
            <Grid container justify="space-between" alignItems="center">
                <Button onClick={onClose}>close</Button>
                <Button
                    type="submit"
                    variant="outlined">Submit</Button>
            </Grid>
        </Form>
    );
}

export default ResetPassword;