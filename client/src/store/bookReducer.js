const defaultState = { //присваивается когда пользователь открыл пирложение
    book: null
}

const bookReducer = (state = defaultState, action) => {
    switch(action.type){
            case "UPDATE_BOOK":
                return{...state, book: action.payload}
            
        default: return state
    }
}

export default bookReducer;