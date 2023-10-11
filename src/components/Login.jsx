import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpLogin } from '../api/api';
// https://ultimatecourses.com/blog/programmatically-navigate-react-router
// Componente login
export const Login = ({ actualizarToken }) => {
  // me permite navegar a rutas
  const navigate = useNavigate();
  // variables de estado de los inputs de usuario y contraseña
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  // funcion asincrona que permite ingresar y navegar al usuario segun su rol
  const logearse = async (usuario, contrasena) => {
    try {
      // llamo a la funcion httpLogin para validar el usuario y contraseña
      const data = await httpLogin(usuario, contrasena)
      // si estoy logeado actualizo el token
      actualizarToken(data.accessToken)
      // según el rol del usuario navego a su ruta
      if (data.user.role === 'admin') return navigate('/admin/empleados');
      if (data.user.role === 'chef') return navigate('/cocina/pendientes');
      if (data.user.role === 'waiter') return navigate('/mozo/pedidos');
    } catch (error) {
      alert("Email o contraseña incorrectos Verifique porfavor")
    }
  }

  // añadido para que cuando se llame a salir de cualquier nav limpie el token y no pueda usar las rutas nuevamente
  // me sirve para limpiar el token cuando se pulse salir
  useEffect(() => actualizarToken(""), [])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <form className="p-5 rounded shadow-lg bg-light">
          <h1 className="text-center mb-4">Burger Queen Login</h1>
          <div className="mb-3">
            <label htmlFor="inputUsuario" className="form-label">Email de Usuario</label>
            <input
              id="inputUsuario"
              type="text"
              className="form-control"
              placeholder="Correo de Usuario"
              value={usuario}
              // actualizando variable de estado usuario cuando escribo
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Contraseña</label>
            <input
              id="inputPassword"
              type="password"
              className="form-control"
              value={contrasena}
              // actualizando variable de estado contrasena cuando escribo
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button type="button" className="btn btn-primary" onClick={() => logearse(usuario, contrasena)}>Ingresar</button>
          </div>
        </form>
      </div>
    </>
  )
}