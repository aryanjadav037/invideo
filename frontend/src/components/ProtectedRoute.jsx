// src/components/ProtectedRoute.jsx
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useContext(AuthContext)

//   if (!isAuthenticated) {
//     // Redirect to login page if not authenticated
//     return <Navigate to="/login" replace />
//   }

//   return children
// }

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();
    
    if (isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return children;
};
export default ProtectedRoute