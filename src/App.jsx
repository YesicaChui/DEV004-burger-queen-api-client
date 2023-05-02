import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/Login.jsx'
import { AdminEmpleados } from './components/admin/AdminEmpleados.jsx'
import { AdminProductos } from './components/admin/AdminProductos.jsx'
import { useState } from 'react'
function App() {

  const [token, setToken]=useState('')

  function actualizarToken(miToken){
    setToken(miToken)
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Login actualizarToken={actualizarToken}/>,
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
      element:<AdminEmpleados token={token}/>
    },
    {
      path: "/admin/productos",
      element:<AdminProductos/>
    },
  ])
  return (
    <>
        <RouterProvider router={router}/>
     
    </>
  )
}

export default App
