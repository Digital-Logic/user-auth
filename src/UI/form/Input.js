import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import InputComponent from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    error: {
        color: theme.palette.error.main
    },
    underline: {
        '&$disabled': {
            '&:before': {
                borderBottomStyle: 'solid'
            }
        }
    },
    root: {
        '&$disabled': {
        }
    },
    disabled:{}
});

const RenderInput = compose(
    withStyles(styles)
)(({classes, input, meta: { touched, error, warning }, label, ...rest}) => {
    return (
        <Grid item>
            <FormControl fullWidth className={classes.root}>
                <InputLabel>{ label }</InputLabel>

                <InputComponent
                    classes={{ underline: classes.underline, disabled: classes.disabled }}
                    { ...input }
                    { ...rest }
                />

                { touched && error ? <FormHelperText className={classes.error}>{ error }</FormHelperText> : '' }
            </FormControl>
        </Grid>
    );
});



function Input({ name, ...props }) {
    return (
        <Field
            name={name}
            component={RenderInput}
            { ...props }
        />
    );
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
};


export default  Input;