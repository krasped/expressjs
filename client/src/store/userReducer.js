const defaultState = { //присваивается когда пользователь открыл пирложение
    user: null
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
        // case "ADD_CASH":
        //     return{...state, cash : state.cash + action.payload}
        // case "":
            // case "GET_BOOK_TITLE":
            //     return {...state.user}
            case "UPDATE_USER":
                return{...state, user: action.payload}
            
        default: return state
    }
}

export default userReducer;