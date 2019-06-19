import React, { createContext, useReducer, useMemo } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { AccountActivated, Loading, ErrorModel } from './index';

const ModelContext = createContext();

const ACTIONS = Object.freeze({
    SET_STATE: 'SET_STATE',
    CREATE_MODEL: 'CREATE_MODEL'
});


const MODEL_STATES = {
    default: 'default',
    CLOSED: 'CLOSED',
    LOADING: 'LOADING',
    ACCOUNT_ACTIVATED: 'ACCOUNT_ACTIVATED',
    ERROR: 'ERROR'
};


function withModelManager() {
    // Initialization logic goes here...

    function _withModelManager(WrappedComponent) {

        const initialState = {
            state: MODEL_STATES.CLOSED,
            displayState: MODEL_STATES.LOADING,
            actions: Object.values(MODEL_STATES).reduce( (acc, key) => {
                acc[key] = {
                    onClose:({ state, setState }) => {
                        if (state !== MODEL_STATES.LOADING) {
                            setState(MODEL_STATES.CLOSED)
                        }
                    }
                };
                return acc;
            },{}),
            models: {
                [MODEL_STATES.CLOSED]: null,
                // Generic loading model
                [MODEL_STATES.LOADING]: Loading,
                [MODEL_STATES.ACCOUNT_ACTIVATED]: AccountActivated,
                [MODEL_STATES.ERROR]: ErrorModel
            },
            props: {}
        };

        function WithModelManager(_props) {

            const [{ state, displayState, models, actions, props }, dispatch] = useReducer(reducer, initialState);


            const contextValue = useMemo(() => ({
                state,
                setState: state => dispatch(setState(state)),
                createModel: (...models) => {
                    if (Array.isArray(models[0]))
                        models.push(...models.shift());
                    models.forEach(model => dispatch(createModel(model)));
                },
                STATES: Object.keys(models).reduce((acc, key) => {
                    acc[key] = key;
                    return acc;
                },{})
            }),[state, dispatch, models]);

            // Each function defined in this models actions, will be provided with state and setState properties
            // by wrapping these properties with a closure and memorizing them
            const modelActions = useMemo(() => Object.entries(actions[displayState]).reduce((acc, [key, fun]) => {
                acc[key] = (data) => fun({
                    state: displayState,
                    setState: state => dispatch(setState(state)),
                    STATES: contextValue.STATES,
                    ...data
                });
                return acc;
            },{}), [displayState, actions, contextValue.STATES]);

            const CurrentModel = models[displayState];

            return (
                <ModelContext.Provider value={contextValue}>
                    <WrappedComponent {..._props} />

                    <Dialog
                        open={state !== MODEL_STATES.CLOSED}
                        onClose={ modelActions.onClose }>

                        <CurrentModel
                            state={displayState}
                            actions={modelActions}
                            onClose={modelActions.onClose}
                            {...props}
                        />
                    </Dialog>
                </ModelContext.Provider>
            );
        }
        return WithModelManager;
    }
    return _withModelManager;
}



function reducer(state, { type, newState, key, model, actions, props }) {
    switch(type) {
        case ACTIONS.SET_STATE:
            // Check if the requested state exist
            if (Object.keys(state.models).indexOf(newState) === -1)
                throw new Error('WithModelManager: request to change to an invalid state.');

            return {
                ...state,
                state: newState,
                displayState: newState === MODEL_STATES.CLOSED ? state.displayState : newState,
                props
            };

        case ACTIONS.CREATE_MODEL:
            MODEL_STATES[key] = key;
            return {
                ...state,
                models: {
                    ...state.models,
                    [key]: model
                },
                actions: {
                    ...state.actions,
                    [key]: {
                        ...state.actions[key],
                        ...actions,
                        onClose: typeof actions.onClose === 'function' ? actions.onClose :
                            state.actions.default.onClose
                    }
                }
            };
        default:
            return state;
    }
}


function createModel({ state: key, model, actions={} }) {
    if (model === null || ( typeof model !== 'function' && typeof model !== 'object'))
        throw new TypeError(`Invalid type of model: ${key} : ${typeof model}`);

    return {
        type: ACTIONS.CREATE_MODEL,
        key,
        model,
        actions,
    };
}

function setState(state, props={}) {
    return {
        type: ACTIONS.SET_STATE,
        newState: state,
        props
    };
}

export default withModelManager;

export {
    ModelContext,
    MODEL_STATES
};