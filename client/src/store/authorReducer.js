const defaultState = {
    //присваивается когда пользователь открыл пирложение
    author: null,
};

const authorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_AUTHOR":
            return { ...state, author: action.payload };

        default:
            return state;
    }
};

export default authorReducer;
