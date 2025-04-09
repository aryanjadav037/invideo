// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import HeroSection from './Pages/HeroSection.jsx'
import SignUpModal from './Pages/SignUpModal .jsx'
import LoginModal from './Pages/LoginModal.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import SimpleLayout from './Layout/SimpleLayout.jsx'
import ProfilePage from './Pages/Workspace/ProfilePage.jsx'
import Workspace from './Pages/Workspace/WorkSpace.jsx'
import ErrorPage from './Pages/ErrorPage.jsx'
import EmailVerificationPage from './Pages/EmailVerificationPage.jsx' // Import the new component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, // Uses Navbar+Footer
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HeroSection/> },
      { path: "/signup", element: <SignUpModal/> },
      { path: "/login", element: <LoginModal /> },
      { path: "/verify-email", element: <EmailVerificationPage /> }, // Add new route
    ],
  },
  {
    path: "/",
    element: <SimpleLayout/>, // No Navbar/Footer]
    errorElement: <ErrorPage />,
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