import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ImagePage from './components/ImagePage.tsx'
import UserPage from './components/UserPage.tsx'
import Layout from './components/Layout.tsx'
import DetailLayout from './components/DetailLayout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      {
        element: <DetailLayout />,
        children: [
          { path: "image/:id", element: <ImagePage /> },
          { path: "user/:userId", element: <UserPage /> },
        ]
      },
      { path: "*", element: <div>Page not found</div> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)