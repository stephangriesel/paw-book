function AppReducer(state,action) {
    switch (action.type){
        case "ADD_DOG_TO_FAVORITES":
            return {
                ...state,
                favorites: [action.payload, ...state.favorites],
            }
        default:
            return state;
    }
}

export default AppReducer;