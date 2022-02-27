const defaultState = {
    //присваивается когда пользователь открыл пирложение
    covers: []
};

const addCover = (covers, cover) => {
    console.log(covers)
    if(covers.length === 0 ){
        return [cover];
    } else if (covers.length > 0){
        let isEquelCover = false;
        let newCovers = covers.map((item) => {
            if(item.id === cover.id){
                isEquelCover = true;
                return cover; 
            }
            return item;
        })
        if(isEquelCover){
            return newCovers;
        }else {
            return[...newCovers, cover]
        }
    }
}

const coversReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_COVERS":
            return { ...state, covers: addCover(state.covers, action.payload) };
        case "DELETE_COVER":
            return { ...state, covers: state.covers.filter(item => item.id !== action.payload) };

        default:
            return state;
    }
};

export default coversReducer;
