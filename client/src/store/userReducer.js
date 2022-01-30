const defaultState = { //присваивается когда пользователь открыл пирложение
    user: null
}

const userReducer = (state = defaultState, action) => {
    switch(action.type){
            case "UPDATE_USER":
                return{...state, user: action.payload}
            
        default: return state
    }
}

export default userReducer;