
import {applyMiddleware, combineReducers, createStore } from 'redux';
// import reducer from './reducer.js'
import thunk from 'redux-thunk';
import bookReducer from './bookReducer.js';
import bookTitleReducer from './bookTitleReducer.js';
import userReducer from './userReducer.js';
// import custonerReducer from './customerReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// action = {type: '', payload: ''};//payload можно вытащить как и ти
const rootReducer = combineReducers({ book: bookReducer, bookTitle: bookTitleReducer, user: userReducer})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
