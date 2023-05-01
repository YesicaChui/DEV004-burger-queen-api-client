import { useState } from 'react';
import axios from 'axios';
// Componente login
export const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const logearse = () => {
    console.log('Correo Usuario:', usuario);
    console.log('Contraseña:', contrasena);
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
        alert("Login Exitoso")
      })
      // si el codigo es de 400 para arriba
      .catch(error => {
        console.log(error)
        alert("Email o contraseña incorrectos Verifique porfavor")
      })
  }
  return (
    <>
      <form className="mt-5">
        <div className="mb-3">
          <label htmlFor="inputUsuario" className="form-label">Correo de Usuario</label>
          <input
            id="inputUsuario"
            type="text"
            className="form-control" placeholder="Correo de Usuario"
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
        <button type="button" className="btn btn-primary" onClick={logearse}>Ingresar</button>
      </form>
    </>
  )
}