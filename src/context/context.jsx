import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [searchVisible, setSearchVisible] = useState(false)

  return (
    <AppContext.Provider value={{ searchVisible, setSearchVisible }}>
      {children}
    </AppContext.Provider>
  );
};
