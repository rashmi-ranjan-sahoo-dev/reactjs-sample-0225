import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, name, setName }}>
      {children}
    </AuthContext.Provider>
  );
};
