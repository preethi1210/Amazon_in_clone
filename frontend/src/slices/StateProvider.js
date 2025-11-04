import React, { createContext, useContext, useReducer } from "react";

// 1️⃣ Create a context (like a global store)
export const StateContext = createContext();

// 2️⃣ Wrap your app with this provider
// Pass in a reducer, initial state, and children components
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// 3️⃣ Custom hook to pull state or dispatch from the context
export const useStateValue = () => useContext(StateContext);
