import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import asyncReducer from "../reducers/posts";
import modalsReducer from '../reducers/modals';

const rootReducer = combineReducers({asyncReducer, modalsReducer});

const store = createStore(rootReducer, applyMiddleware(thunk));

console.log('sore in create: ', store.getState());

export default store;
