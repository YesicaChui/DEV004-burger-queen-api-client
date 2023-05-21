import React from "react"
import { Link } from "react-router-dom"
export const NavAdmin = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* nos permite navegar entre rutas sin actualizar la ventana */}
          <Link className="navbar-brand" to="/admin/empleados">ADMINISTRACIÓN</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`/admin/empleados`}>Empleados</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/admin/productos`}>Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/`}>Salir</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
