import { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        isLoading: true
    });

    // Initialize auth state from localStorage
    useEffect(() => {
        const initializeAuth = () => {
            const token = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');
            
            if (token && userData) {
                try {
                    const user = JSON.parse(userData);
                    setAuthState({
                        isAuthenticated: true,
                        user,
                        isLoading: false
                    });
                } catch (error) {
                    console.error('Failed to parse user data:', error);
                    localStorage.removeItem('userData');
                    setAuthState(prev => ({ ...prev, isLoading: false }));
                }
            } else {
                setAuthState(prev => ({ ...prev, isLoading: false }));
            }
        };
        
        initializeAuth();
    }, []);

    const login = useCallback((token, userData) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setAuthState({
            isAuthenticated: true,
            user: userData,
            isLoading: false
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false
        });
    }, []);

    return (
        <AuthContext.Provider value={{ 
            ...authState, 
            login, 
            logout 
        }}>
            {children}
        </AuthContext.Provider>
    );
};