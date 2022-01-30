const defaultState = { //присваивается когда пользователь открыл пирложение
    book: null
}

const bookReducer = (state = defaultState, action) => {
    switch(action.type){
        // case "ADD_CASH":
        //     return{...state, cash : state.cash + action.payload}
        // case "":
            // case "GET_BOOK":
            //     return {...state.book}
            case "UPDATE_BOOK":
                return{...state, book: action.payload}
            
        default: return state
    }
}

export default bookReducer;