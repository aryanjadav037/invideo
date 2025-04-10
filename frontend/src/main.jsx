// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import HeroSection from './Pages/HeroSection.jsx'
 // Renamed from SignUpModal
import LoginPage from './Pages/LoginModal.jsx'   // Renamed from LoginModal
import SignUpPage from './Pages/SignUpModal .jsx'   // Renamed from LoginModal
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import SimpleLayout from './Layout/SimpleLayout.jsx'
import ProfilePage from './Pages/Workspace/ProfilePage.jsx'
import Workspace from './Pages/Workspace/Workspace.jsx'
import UnderConstructionPage from './Pages/UnderConstructionPage.jsx'
import EmailVerificationPage from './Pages/EmailVerificationPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",  
    element: <Layout/>, // Uses Navbar+Footer
    errorElement: <UnderConstructionPage />,
    children: [
      { path: "/", element: <HeroSection/> },
      // Removed signup and login from here
    ],
  },
  {
    path: "/signup",
    element: <SimpleLayout/>, // Will not show Navbar/Footer
    children: [
      { index: true, element: <SignUpPage /> }
    ]
  },
  {
    path: "/login",
    element: <SimpleLayout/>, // Will not show Navbar/Footer
    children: [
      { index: true, element: <LoginPage /> }
    ]
  },
  {
    path: "/verify-email",
    element: <SimpleLayout/>,
    children: [
      { index: true, element: <EmailVerificationPage /> }
    ]
  },
  {
    path: "/",
    element: <SimpleLayout/>, // No Navbar/Footer
    children: [
      { 
        path: "/workspace", 
        element: (
          <ProtectedRoute>
            <Workspace/>
          </ProtectedRoute>
        ) 
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);