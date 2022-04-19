import React, {createContext, useContext, useReducer} from 'react';

// Prepare the Data Layer
export const StateContext = createContext();

// Wrap the app and provide Data Layer
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// Pull info from Data Layer
export const useStateValue = () => useContext(StateContext);