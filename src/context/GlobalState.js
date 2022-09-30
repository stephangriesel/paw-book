import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
    favorites: [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // actions
    const addDogToFavorites = (dog) => {
        dispatch({ type: "ADD_DOG_TO_FAVORITES", payload: dog })
    }

    return (
        <GlobalContext.Provider value={{ favorites: state.favorites, addDogToFavorites }}>
            {props.children}
        </GlobalContext.Provider>
    )
}