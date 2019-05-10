import React, { Fragment, useReducer } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { STATES } from './constants';


const ACTIONS = Object.freeze({
    SET_MODEL_STATE: 'SET_MODEL_STATE',
    CREATE_ACTIONS: 'CREATE_ACTIONS',
    SET_TITLE: 'SET_TITLE',
    SET_MESSAGE: 'SET_MESSAGE'
});

/**
 * Model dispatch creators,
 */
const modelActions = {
    setState: state => ({ type: ACTIONS.SET_MODEL_STATE, model: { state } }),
    createActions: actions => {
        return ({ type: ACTIONS.CREATE_ACTIONS, actions });
    },
    setTitle: (titles) => {
        if (typeof titles !== 'object' && // validate that the key passed is a valid Model STATE, or throw error
            !Object.keys(titles).reduce( (isValid, key) => isValid && STATES[key] !== 'undefined', true))
                throw new TypeError(`Title key ${ Object.keys(titles).filter(key => STATES[key] === 'undefined') } is not a valid Model State.`);

        return {
          type: ACTIONS.SET_TITLE, titles
        }
    },
    setMessage: (messages) => {
        if (typeof titles !== 'object' && // validate that the key passed is a valid Model STATE, or throw error
            !Object.keys(messages).reduce( (isValid, key) => isValid && STATES[key] !== 'undefined', true))
                throw new TypeError(`Message key ${ Object.keys(messages).filter(key => STATES[key] === 'undefined') } is not a valid Model State.`);
        return {
            type: ACTIONS.SET_MESSAGE, messages
        };
    }
};


function withModel(Model) {
    function _withModel(WrappedComponent) {
        function WithModel( props) {

            const [ model, dispatch ] = useReducer(reducer, {
                    state: STATES.CLOSED,
                    displayState: STATES.CLOSED,
                    actions: {
                        onClose: (model) => {
                            if (model.state !== STATES.LOADING && model.state !== STATES.SIGN_OUT && model.state !== STATES.CLOSED )
                                dispatch(modelActions.setState(STATES.CLOSED));
                        },
                        setState: state => dispatch(modelActions.setState(state)),
                        createActions: actions => dispatch(modelActions.createActions(actions)),
                        setTitle: titles => dispatch(modelActions.setTitle(titles)),
                        setMessage: messages => dispatch(modelActions.setMessage(messages))
                    }
                });

            return (
                <Fragment>
                    <WrappedComponent
                        model={model}
                        {...props} />

                    <Dialog
                        open={model.state !== STATES.CLOSED}
                        onClose={ () => model.actions.onClose(model) }>

                        <Model
                            model={ model }
                            state={ model.displayState }
                            actions={ model.actions }
                            setState={ model.actions.setState }
                            onClose={ model.actions.onClose }
                            />

                    </Dialog>
                </Fragment>
            );

            function reducer(state, { type, model, actions, messages, titles }) {
                switch(type) {
                    case ACTIONS.SET_MODEL_STATE:
                        return {
                            ...state,
                            ...model,
                            displayState: model.state === STATES.CLOSED ? state.displayState : model.state
                        };
                    case ACTIONS.CREATE_ACTIONS:
                        return {
                            ...state,
                            actions: {
                                ...state.actions,
                                ...actions
                            }
                        };
                    case ACTIONS.SET_MESSAGE:
                        return {
                            ...state,
                            messages: {
                                ...messages
                            }
                        };
                    case ACTIONS.SET_TITLE:
                        return {
                            ...state,
                            titles: {
                                ...titles
                            }
                        };
                    default:
                        return state;
                }
            }
        }

        return WithModel;
    }
    return _withModel;
}

export default withModel;