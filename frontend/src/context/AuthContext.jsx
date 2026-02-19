import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const backend = import.meta.env.VITE_BACKEND

  const login = async (formData) => {
    const res = await axios.post(`${backend}/api/auth/login`, formData);
    setUser(res.data.user);
  };

  const signup = async (formData) => {
    const res = await axios.post(`${backend}/api/auth/signup`, formData);
    setUser(res.data.user);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
