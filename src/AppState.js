import React, { createContext, useContext } from 'react';

export const AppContext = createContext();

export const Provider = ({ store, children }) => <AppContext.Provider value={store}>{children}</AppContext.Provider>;

export const useStore = () => useContext(AppContext);
