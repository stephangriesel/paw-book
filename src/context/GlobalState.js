import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
    favorites: localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(state.favorites))
    },[state]);

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