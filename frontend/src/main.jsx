// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import LoginModal from './Pages/LoginModal.jsx'
import HeroSection from './Pages/HeroSection.jsx'
import SignUpModal from './Pages/SignUpModal .jsx'
import Workspace from './Pages/Workspace.jsx' // Add this import
import AuthProvider from './context/AuthContext.jsx' // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute.jsx' // We'll create this next
import SimpleLayout from './Layout/SimpleLayout.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, // Uses Navbar+Footer
    children: [
      { path: "/", element: <HeroSection/> },
      { path: "/signup", element: <SignUpModal/> },
      { path: "/login", element: <LoginModal /> },
    ],
  },
  {
    path: "/",
    element: <SimpleLayout/>, // No Navbar/Footer
    children: [
      { path: "/workspace", element: <ProtectedRoute><Workspace /></ProtectedRoute> },
      // Add other pages that shouldn't have Navbar/Footer here
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)