// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import LoginModal from './Pages/LoginModal.jsx'
import HeroSection from './Pages/HeroSection.jsx' // Add this import
import SignUpModal from './Pages/SignUpModal .jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <HeroSection/>, // This will be your homepage
      },
      {
        path: "/signup",
        element: <SignUpModal/>,
      },
      {
        path: "/login",
        element: <LoginModal />,
      },
      // You can add more routes here as needed
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)