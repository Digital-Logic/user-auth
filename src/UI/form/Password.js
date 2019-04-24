import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import InputComponent from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';



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
            color: theme.palette.text.primary
        }
    },
    disabled:{}
});

const RenderInput = compose(
    withStyles(styles)
)(  class RenderPasswordComponent extends PureComponent {

        state = {
            showPassword: false
        };

        onToggle = this.onToggle.bind(this);
        onToggle() {
            this.setState(state => ({
                showPassword: !state.showPassword
            }));
        }

        render() {
            const { classes, input, meta: { touched, error }, label, ...rest } = this.props;
            const { showPassword } = this.state;

            return (
                <Grid item>
                    <FormControl fullWidth className={classes.root}>
                        <InputLabel>{ label }</InputLabel>

                        <InputComponent
                            { ...input }
                            { ...rest }
                            classes={{ underline: classes.underline, disabled: classes.disabled }}
                            type={ showPassword ? 'text' : 'password' }
                            endAdornment={<InputAdornment position="end">
                                    <IconButton onClick={this.onToggle}>
                                    { showPassword ? <VisibilityOff /> : <Visibility /> }
                                    </IconButton>
                                </InputAdornment>}
                        />

                        { touched && error ? <FormHelperText className={classes.error}>{ error }</FormHelperText> : '' }
                    </FormControl>
                </Grid>
            );
        }
    });





function Password({ name, ...props }) {
    return (
        <Field
            name={name}
            component={RenderInput}
            { ...props }
        />
    );
}

Password.propTypes = {
    name: PropTypes.string.isRequired,
};


export default  Password;