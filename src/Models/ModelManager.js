import React from 'react';
import PropTypes from 'prop-types';
import { MODEL_TYPES, Loading, Conform, ChangePassword, FormComponent } from './index';
import { modelActions, authActions, userActions } from '../Store';
import { submit } from 'redux-form';
import { ResetPasswordForm } from '../Forms';

function ModelManager ({ models, dispatch }) {
    return models.map(({ modelType, _id, actions, ...props }) => {

        switch(modelType) {
            case MODEL_TYPES.LOADING:
                return (
                    <Loading
                        key={_id}
                        actions={ createActions(actions, dispatch) }
                        { ...props }
                    />
                );

            case MODEL_TYPES.CONFORM:
                return (
                    <Conform
                        key={_id}
                        actions={ createActions(actions, dispatch)}
                        { ...props }
                    />
                );

            case MODEL_TYPES.CHANGE_PASSWORD:
                return (
                    <ChangePassword
                        key={_id}
                        actions={ createActions(actions, dispatch)}
                        {...props} />
                );

            case MODEL_TYPES.RESET_PASSWORD:
                return (
                    <FormComponent
                        key={_id}
                        component={ ResetPasswordForm }
                        actions={ createActions(actions,dispatch)}
                        {...props} />
                );

            default:
                return undefined;
        }
    });

    function createActions(actions, dispatch) {
        return Object.entries(actions).reduce((acc, [key, value]) => {
            // eslint-disable-next-line default-case
            switch(key) {
                case 'onClose':
                    acc[key] = () => {
                        dispatch(modelActions.destroyModel(value));
                    }
                    break;

                case 'sendActivation':
                    acc[key] = () => {
                        dispatch(modelActions.destroyModel( actions.onClose ));
                        dispatch(authActions.sendEmailValidation(value));
                    }
                    break;

                case 'onFormSubmit':
                    acc[key] = () => dispatch(submit(value))
                    break;

                case 'onDispatch':
                    acc[key] = () => value
                    break;

                case 'onConform':
                    acc.onConform = () => {
                        dispatch(value);
                    };
                    break;

                case 'onDeleteUser':
                    acc.onConform = () => {
                        dispatch(modelActions.destroyModel( actions.onClose));
                        dispatch(userActions.deleteUser( value ))
                    }
                    break;
            }
            return acc;
        },{});
    }
}

ModelManager.propTypes = {
    models: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};


export default ModelManager;