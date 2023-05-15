import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpLogin } from '../api/api';
// https://ultimatecourses.com/blog/programmatically-navigate-react-router
// Componente login
export const Login = ({ actualizarToken }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const logearse = async (usuario, contrasena) => {
    try {
      const data = await httpLogin(usuario, contrasena)
      actualizarToken(data.accessToken)
      if (data.user.role === 'admin') return navigate('/admin/empleados');
      if (data.user.role === 'chef') return navigate('/cocina/pendientes');
      if (data.user.role === 'waiter') return navigate('/mozo/pedidos');
    } catch (error) {
      alert("Email o contraseña incorrectos Verifique porfavor")
    }
  }
  
  // añadido para que cuando se llame a salir de cualquier nav limpie el token y no pueda usar las rutas nuevamente
  useEffect(() => actualizarToken(""), [])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <form className="p-5 rounded shadow-lg bg-light">
          <h1 className="text-center mb-4">Burger Queen Login</h1>
          <div className="mb-3">
            <label htmlFor="inputUsuario" className="form-label">Correo de Usuario</label>
            <input
              id="inputUsuario"
              type="text"
              className="form-control"
              placeholder="Correo de Usuario"
              value={usuario}
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