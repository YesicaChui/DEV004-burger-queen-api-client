import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/Login.jsx'
import { AdminEmpleados } from './components/admin/AdminEmpleados.jsx'
import { AdminProductos } from './components/admin/AdminProductos.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element:<Login/>,
    errorElement:<h1>error ruta</h1>
  },
  {
    path: "/mesera",
    element:<h1>Mozo/a</h1>
  },
  {
    path: "/cocina",
    element:<h1>Cocina</h1>
  },
  {
    path: "/admin/empleados",
    element:<AdminEmpleados/>
  },
  {
    path: "/admin/productos",
    element:<AdminProductos/>
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
/*   <React.StrictMode>
    <App />
  </React.StrictMode>, */
  <RouterProvider router={router}/>
)
