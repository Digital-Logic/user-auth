import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from './auth';
import { userReducer } from './user';


const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});


const Store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

export {
    Store
};

