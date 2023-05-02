import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/Login.jsx'
import { AdminEmpleados } from './components/admin/AdminEmpleados.jsx'
import { AdminProductos } from './components/admin/AdminProductos.jsx'





ReactDOM.createRoot(document.getElementById('root')).render(
/*   <React.StrictMode>
    <App />
  </React.StrictMode>, */
  <App />
  // <RouterProvider router={router}/>
)
