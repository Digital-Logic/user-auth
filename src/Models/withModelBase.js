import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { STATES } from './constants';


function withModelBase(options) {

    // Configuration
    const { onClose } = {
        onClose: (state, setState) => () => {
            if (state !== STATES.LOADING)
                setState(STATES.CLOSED);
        },
        ...options
    };

    function _withModelBase(WrappedComponent) {
        function WithModelBase({ state, setState, ...props }) {

            return (
                <Dialog
                    open={state !== STATES.CLOSED}
                    onClose={ onClose(state, setState) }>

                    <WrappedComponent
                        state={state}
                        setState={setState}
                        { ...props } />

                </Dialog>
            );
        }

        WithModelBase.propTypes = {
            state: PropTypes.oneOf(Object.values(STATES)).isRequired,
            setState: PropTypes.func.isRequired
        };

        WithModelBase.defaultProps = {
            state: STATES.CLOSED
        };

        return WithModelBase;
    }
    return _withModelBase;
}


export default withModelBase;