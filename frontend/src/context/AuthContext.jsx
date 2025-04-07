import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const userData = localStorage.getItem("userData");
      if (token && userData) {
        const user = JSON.parse(userData);
        if (user && token) {
          setAuthState({
            isAuthenticated: true,
            user,
            token,
          });
        }
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      // Clear corrupted data
      localStorage.removeItem("userData");
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setAuthState({
      isAuthenticated: true,
      user: userData,
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
