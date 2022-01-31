const defaultState = {
    //присваивается когда пользователь открыл пирложение
    bookTitle: null,
};

const bookTitleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_BOOK_TITLE":
            return { ...state, bookTitle: action.payload };

        default:
            return state;
    }
};

export default bookTitleReducer;
