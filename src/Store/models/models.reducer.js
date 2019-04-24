const ACTIONS = Object.freeze({
    CREATE: 'CREATE_MODEL',
    UPDATE: 'UPDATE_MODEL',
    DESTROY: 'DESTROY_MODEL'
});

const initialState = [];

function reducer(state=initialState, { type, model }) {
    switch(type) {
        case ACTIONS.CREATE:
            return [
                ...state,
                model
            ];

        case ACTIONS.UPDATE:
            return state.map(curModel => {
                if (curModel._id === model._id) {
                    return {
                        ...curModel,
                        ...model,
                        actions: {
                            ...curModel.actions,
                            ...model.actions
                        }
                    };
                } else {
                    return curModel
                }
            });

        case ACTIONS.DESTROY:
            return state.filter(curModel => curModel._id !== model._id);

        default:
            return state;
    }
}

export {
    ACTIONS,
    reducer
};