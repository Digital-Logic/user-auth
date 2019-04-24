import React from 'react';
import { Field } from 'redux-form';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';

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

const InputComponent = withStyles(styles)(Input);


const RenderSelect = compose(
    withStyles(styles)
)(({ classes, label, input, meta: { touched, error, warn }, children, ...props}) => (
    <Grid item>
        <FormControl fullWidth>
            <InputLabel>{ label }</InputLabel>
            <Select
                input={ <InputComponent />}
                {...input}
                {...props}>
                { children }
            </Select>
            { touched && error ? <FormHelperText className={classes.error}>{ error }</FormHelperText> : '' }
        </FormControl>
    </Grid>
));


function SelectComponent ({name, ...props}) {
    return (
        <Field
            name={name}
            component={ RenderSelect }
            {...props}
        />
    );
}

SelectComponent.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node, PropTypes.arrayOf(PropTypes.node)
    ]).isRequired
}

export default SelectComponent;