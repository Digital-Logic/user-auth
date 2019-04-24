import { ACTIONS } from './models.reducer';
import { MODEL_TYPES, MODEL_STATES } from './index';
import { ROUTES } from '../../Routes';

let modelId = 1;


function createDeleteModel(props) {
    return function _createLoadingModel(dispatch) {
        const { model } = dispatch(createModel({
            modelType: MODEL_TYPES.DELETE,
            ...props
        }));
        return { _id: model._id };
    }
}

function createChangePasswordModel({ user, ...props}) {
    return function _createChangePasswordModel(dispatch) {
        const { model } = dispatch(createModel({
            modelType: MODEL_TYPES.CHANGE_PASSWORD,
            actions: {
                onFormSubmit: 'changePassword',
                onDispatch: {
                    user
                }
            },
            ...props
        }));

        return { _id: model.id };
    }
}

function createRestPasswordModel({ token, ...props}) {
    return function _createResetPasswordModel(dispatch) {
        const { model } = dispatch(createModel({
            modelType: MODEL_TYPES.RESET_PASSWORD,
            actions: {
                onFormSubmit: 'resetPassword',
                onDispatch: {
                    token
                }
            },
            state: MODEL_STATES.LOADING,
            ...props
        }));

        return { _id: model._id };
    }
}

function createSignUpModel() {
    return function _createLoginModel(dispatch) {
        const { model } = dispatch(createModel({
            title: 'Creating Account',
            modelType: MODEL_TYPES.LOADING,
            actions: {
                onRedirect: ROUTES.SIGN_IN
            }
        }));
        return model;
    }
}

function createConformModel(props) {
    return function _createConformModel(dispatch) {
        const { model } = dispatch(createModel({
            modelType: MODEL_TYPES.CONFORM,
            ...props
        }));

        return { _id: model._id };
    }
}

function createLoadingModel(props) {

    return function _createLoadingModel(dispatch) {
        const { model } = dispatch(createModel({
            modelType: MODEL_TYPES.LOADING,
            ...props
        }));
        return { _id: model._id };
    }
}


function createModel({ modelType, open=true, actions={}, ...model }) {

   if (Object.values(MODEL_TYPES).indexOf(modelType) === -1)
       throw new TypeError('Invalid MODEL_TYPE specified in createModel.');

    const _id = modelId++;
    return {
        type: ACTIONS.CREATE,
        model: {
            _id,
            modelType,
            actions: {
                ...actions,
                onClose: {
                    _id
                },
                onDispatch: {
                    model: { _id },
                    ...actions.onDispatch
                }
            },
            open,
            ...model
        }
    };
}

function updateModel(model) {
    return {
        type: ACTIONS.UPDATE,
        model
    };
}

function destroyModel(model) {
    return function (dispatch) {
        // Hide the model first
        dispatch(updateModel({ ...model, open: false }));
        // Wait one second before destroying the model,
        // to allow any animations to play
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(_destroyModel(model))), 1000);
        });
    };

    function _destroyModel(model) {
        return {
            type: ACTIONS.DESTROY,
            model
        };
    }
}


export {
    createModel,
    updateModel,
    destroyModel,
    createLoadingModel,
    createDeleteModel,
    createConformModel,
    createChangePasswordModel,
    createRestPasswordModel,
    createSignUpModel
};