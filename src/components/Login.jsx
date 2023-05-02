import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// https://ultimatecourses.com/blog/programmatically-navigate-react-router
// Componente login
export const Login = ({actualizarToken}) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const inputUsuario = useRef(null)
  const logearse = (usuario, contrasena) => {
    axios.post("http://localhost:8080/login", {
      "email": usuario,
      "password": contrasena
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data)
        console.log(response.data.user.role)
        actualizarToken(response.data.accessToken)

        //alert("Login Exitoso")
        if (response.data.user.role === 'admin') return navigate('/admin/empleados');
        if (response.data.user.role === 'chef') return navigate('/cocina');
        if (response.data.user.role === 'waiter') return navigate('/mesera');

      })
      // si el codigo es de 400 para arriba
      .catch(error => {
        console.log(error)
        alert("Email o contraseña incorrectos Verifique porfavor")
      })
  }
  
  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <form className="p-5 rounded shadow-lg bg-light">
        <h1 className="text-center mb-4">Burger Queen Login</h1>
        <div className="mb-3">
          <label htmlFor="inputUsuario" className="form-label">Correo de Usuario</label>
          <input
            id="inputUsuario"
            ref={inputUsuario}
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