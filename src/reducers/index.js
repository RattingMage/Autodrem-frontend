 import {applyMiddleware, combineReducers, createStore} from 'redux';
 import authReducer from "./auth";
 import serviceRreducer from "./service";
 import thunk from "redux-thunk";
 import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer =  combineReducers({
    auth: authReducer,
    service: serviceRreducer,
});

 const initialState = {};

 const middleware = [thunk];

export const store = createStore(rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    );