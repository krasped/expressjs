const defaultState = {
    //присваивается когда пользователь открыл пирложение
    author: null,
    authorId: null
};

const authorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_AUTHOR":
            return { ...state, author: action.payload };
        case "UPDATE_AUTHOR_ID":
            return { ...state, authorId: action.payload };

        default:
            return state;
    }
};

export default authorReducer;
