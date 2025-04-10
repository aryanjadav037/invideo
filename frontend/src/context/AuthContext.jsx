import axios from 'axios';
import { createContext, useState, useEffect, useCallback } from 'react';

const api = import.meta.env.VITE_SERVER_API;
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        isLoading: true  // Added loading state
    });

    // Validate token with backend
    const validateToken = useCallback(async () => {
        try {
            const response = await axios.get(`${api}/api/auth/validate`, {
              withCredentials: true
            });
            return response.data.isValid;
        } catch (error) {
            console.error('Token validation failed:', error);
            return false;
        }
    }, []);

    // Initialize auth state - runs on app load
    const initializeAuth = useCallback(async () => {
        const userData = localStorage.getItem('userData');
        
        if (userData) {
            try {
                const isValid = await validateToken();
                
                if (isValid) {
                    setAuthState({
                        isAuthenticated: true,
                        user: JSON.parse(userData),
                        isLoading: false
                    });
                    return;
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            }
            
            // Clear invalid data
            localStorage.removeItem('userData');
        }
        
        setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false
        });
    }, [validateToken]);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    const login = useCallback((token, userData) => {
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setAuthState({
            isAuthenticated: true,
            user: userData,
            isLoading: false
        });
        
        return true;
    }, []);

    const logout = useCallback(async () => {
        try {
            await axios.post(`${api}/api/auth/logout`, {}, {
                withCredentials: true
            });
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('userData');
            setAuthState({
                isAuthenticated: false,
                user: null,
                isLoading: false
            });
        }
    }, []);

    const updateUser = useCallback((updatedData) => {
        const updatedUser = {
            ...authState.user,
            data: {
                ...authState.user?.data,
                ...updatedData
            }
        };
        
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setAuthState(prev => ({
            ...prev,
            user: updatedUser
        }));
    }, [authState.user]);

    return (
        <AuthContext.Provider value={{ 
            ...authState, 
            login, 
            logout,
            updateUser,
            initializeAuth // Expose for manual revalidation
        }}>
            {children}
        </AuthContext.Provider>
    );
};