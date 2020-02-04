import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import asyncReducer from "../reducers/posts";
import asyncCategoriesReducer from '../reducers/categories';
import modalsReducer from '../reducers/modals';

const rootReducer = combineReducers({asyncReducer, modalsReducer, asyncCategoriesReducer});

const store = createStore(rootReducer, applyMiddleware(thunk));

console.log('store in create: ', store.getState());

export default store;
