import { createContext, useContext } from "react";

// Create the context
export const AuthContext = createContext(null);

// Create a custom hook to use it easily anywhere
export const useAuth = () => useContext(AuthContext);
