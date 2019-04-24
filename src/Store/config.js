import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './auth';
import { modelReducer } from './models';
import { userReducer } from './user';
import formReducer from './formReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    models: modelReducer,
    users: userReducer
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
