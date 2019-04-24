import React from 'react';
import { Field } from 'redux-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    color: {
    },
    disabled: {
    },
    checked: {
        '&$disabled': {
            color: theme.palette.primary.light
        },
        '&$color': {
            color: theme.palette.primary.light
        }
    }
});

const RenderComponent = withStyles(styles)(({classes, input:{ value, ...input}, meta: { touched, error, warning }, label, ...rest}) => (
    <FormControlLabel control={
        <Checkbox
            classes={{
                colorPrimary: classes.color,
                disabled: classes.disabled,
                checked: classes.checked }}

            {...input}
            color="primary"
            checked={value}
            {...rest} /> }
        label={label}
    />

));


function CheckboxComponent({name, ...props}) {
    return (
        <Field
            name={name}
            component={RenderComponent}
            {...props} />
    );
}

CheckboxComponent.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default CheckboxComponent;