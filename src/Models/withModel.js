import React, { Fragment, useReducer, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { STATES } from './constants';

/**
 * ModelActions dispatch creator
 */
const modelActions = {
    setState: state => ({ type: ACTIONS.SET_MODEL_STATE, model: { state } }),
    createActions: actions => {
        return ({ type: ACTIONS.CREATE_ACTIONS, actions });
    }
};

/**
 *
 */
const dynamicActions = {
    // onClose: ({ model, dispatch }) => () => {
    //     if (model.state !== STATES.LOADING)
    //         dispatch(modelActions.setState(STATES.CLOSED));
    // },
    setState: ({ dispatch }) => state => {
        dispatch(modelActions.setState(state));
    },
    createActions: ({ dispatch }) => actions => {
        dispatch(modelActions.createActions(actions))
    }
}

const initialState = {
    state: STATES.CLOSED,
    displayState: STATES.CLOSED,
    actions: {
    }
};

const ACTIONS = Object.freeze({
    SET_MODEL_STATE: 'SET_MODEL_STATE',
    CREATE_ACTIONS: 'CREATE_ACTIONS'
});


function withModel(Model) {
    function _withModel(WrappedComponent) {
        function WithModel( props) {

            const [ model, dispatch ] = useReducer(reducer, initialState);

            const actions = {
                ...mapActions({ model, dynamicActions, dispatch }),
                ...model.actions };


            return (
                <Fragment>
                    <WrappedComponent createModel={createModel} {...props}/>

                    <Dialog
                        open={model.state !== STATES.CLOSED}
                        onClose={ actions.onClose }>

                        <Model
                            state={model.displayState}
                            setState={ modelState => dispatch({ type: ACTIONS.SET_MODEL_STATE, model: { modelState } }) }
                            onClose={ actions.onClose }
                            actions={actions}
                            />

                    </Dialog>
                </Fragment>
            );


            function createModel(task) {
                task({
                        state: model.state,
                        displayState: model.displayState,
                        actions
                    });
            }

            function reducer(state, { type, model, actions }) {
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
                    default:
                        return state;
                }
            }
        }

        // WithModelBase.propTypes = {
        //     state: PropTypes.oneOf(Object.values(STATES)).isRequired,
        //     setState: PropTypes.func.isRequired
        // };

        // WithModelBase.defaultProps = {
        //     state: STATES.CLOSED
        // };

        return WithModel;
    }
    return _withModel;
}

// Create a closure around the actions
function mapActions({ model, dynamicActions, dispatch }) {
    return Object.entries(dynamicActions).reduce( (dynamicActions, [key, func]) => {

        dynamicActions[key] = func({  // execute the function, creating the data bindings
            model: { state: model.state, displayState: model.displayState },
            dispatch
        });

        return dynamicActions;
    },{});
}

function CloseButton({ onClose, state, children, ...props }) {
    return (
        <DialogActions>
            <Grid container justify="flex-end">

            <Button
                disabled={ state === STATES.LOADING }
                onClick={onClose}
                {...props}>{ children || 'Close' }</Button>

            </Grid>
        </DialogActions>
    );
}


export default withModel;


export {
    CloseButton
};