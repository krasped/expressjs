const defaultState = { //присваивается когда пользователь открыл пирложение
    bookTitle: null
}

const bookTitleReducer = (state = defaultState, action) => {
    switch(action.type){
        // case "ADD_CASH":
        //     return{...state, cash : state.cash + action.payload}
        // case "":
            // case "GET_BOOK_TITLE":
            //     return {...state.bookTitle}
            case "UPDATE_BOOK_TITLE":
                return{...state, bookTitle: action.payload}
            
        default: return state
    }
}

export default bookTitleReducer;