import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './components/Login.jsx'
import { AdminEmpleados } from './components/admin/AdminEmpleados.jsx'
import { AdminProductos } from './components/admin/AdminProductos.jsx'
import { useState } from 'react'
import { Pedidos } from './components/Mozo/Pedidos.jsx'
import { ListaPedidos } from './components/Mozo/ListaPedidos.jsx'
import { Pendientes } from './components/Cocina/Pendientes.jsx'
import { Completadas } from './components/Cocina/Completadas.jsx'
import { RutaProtegida } from './components/RutaProtegida.jsx'
import { MozoCanceladasEntregadas } from './components/Mozo/MozoCanceladasEntregadas.jsx'
function App() {

  // variable de estado donde guardare el token para usar las rutas del backend
  const [token, setToken] = useState('')
  // funcion de callback que actualizara el token cuando alguien se alguien
  const actualizarToken = (miToken) => setToken(miToken)

  // variable que guarda todas las rutas del front para la navegación
  // createBrowserRouter necesita un arreglo de objetos con las rutas de navegación
/*     const router = createBrowserRouter([
      {
        //ruta de navegacion raiz
        path: "/",
        // componente donde navegare ---> en el caso de login le entrego la funcion para actualizar el token
        element:<Login actualizarToken={actualizarToken}/>,
        // si no corresponde ninguna ruta muestra el componente de error en este caso h1 solamente
        errorElement:<h1>error ruta</h1>
      },
      {
        path: "/mozo/pedidos",
        element:<Pedidos token={token}/>
      },
      {
        path: "/mozo/lista_pedidos",
        element:<ListaPedidos token={token}/>
      },
      {
        path: "/cocina/pendientes",
        element:<Pendientes token={token}/>
      },
      {
        path: "/cocina/completadas",
        element:<Completadas token={token}/>
      },
      {
        //ruta de navegación
        path: "/admin/empleados",
        // componente a pintar le entregamos la variable de estado token para que use sus rutas del backend
        element:<AdminEmpleados token={token}/>
      },
      {
        path: "/admin/productos",
        element:<AdminProductos token={token}/>
      },
    ]) */
  return (
    //entregamos las rutas de navegación a RouterProvider
    <>
      {/* <RouterProvider router={router}/>   */}  
      <BrowserRouter>
        <Routes>
          <Route element={<RutaProtegida isLogin={!!token}/>}>
            <Route path="/mozo/pedidos" element={<Pedidos token={token} />} />
            <Route path="/mozo/lista_pedidos" element={<ListaPedidos token={token} />} />
            <Route path="/mozo/reporteCanceladas" element={<MozoCanceladasEntregadas token={token} tipoReporte={"canceled"}/>} />
            <Route path="/mozo/reporteEntregadas" element={<MozoCanceladasEntregadas token={token} tipoReporte={"delivered"}/>} />
            <Route path="/cocina/pendientes" element={<Pendientes token={token} />} />
            <Route path="/cocina/completadas" element={<Completadas token={token} />} />
            <Route path="/admin/empleados" element={<AdminEmpleados token={token} />} />
            <Route path="/admin/productos" element={<AdminProductos token={token} />} />
          </Route>
          <Route path="/" element={<Login actualizarToken={actualizarToken} />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
