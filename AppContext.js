import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [memberName, setMemberName] = useState('');

  return (
    <AppContext.Provider value={{ memberName, setMemberName }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
