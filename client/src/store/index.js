import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import bookReducer from "./bookReducer.js";
import bookTitleReducer from "./bookTitleReducer.js";
import userReducer from "./userReducer.js";
import authorReducer from "./authorReducer.js";
import autorizationReducer from "./autorizationReducer.js";
import coversReducer from "./coversReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// action = {type: '', payload: ''};//payload можно вытащить как и ти
const rootReducer = combineReducers({
    book: bookReducer,
    bookTitle: bookTitleReducer,
    user: userReducer,
    author: authorReducer,
    autorization: autorizationReducer,
    cover: coversReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
