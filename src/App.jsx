import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

  // variable de estado donde guardare el token para hacer peticiones http y usar las rutas del backend
  const [token, setToken] = useState('')
  // funcion de callback que actualizara el token cuando alguien ingresa al sistema
  const actualizarToken = (miToken) => setToken(miToken)

  // Retornamos las rutas del preoyecto
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* se protegen las rutas con el componente RutaProtegida el cual enviamos en su prop si estamos logeados con un booleano */}
          <Route element={<RutaProtegida isLogin={!!token} />}>
            {/* el outlet representa a las rutas que son protegidas*/}
            <Route path="/mozo/pedidos" element={<Pedidos token={token} />} />
            <Route path="/mozo/lista_pedidos" element={<ListaPedidos token={token} />} />
            <Route path="/mozo/reporteCanceladas" element={<MozoCanceladasEntregadas token={token} tipoReporte={"canceled"} />} />
            <Route path="/mozo/reporteEntregadas" element={<MozoCanceladasEntregadas token={token} tipoReporte={"delivered"} />} />
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
