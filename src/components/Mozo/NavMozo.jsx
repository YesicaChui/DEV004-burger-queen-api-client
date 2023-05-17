import React from 'react';
import { Link } from "react-router-dom"
export const NavMozo = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/mozo/pedidos">Mozo</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`/mozo/pedidos`}>Pedidos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/mozo/lista_pedidos`}>Lista Pedidos</Link>
              </li>
              <li className="nav-item dropdown me-3">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Reportes
                </a>
                <ul className="dropdown-menu">
                  <li> <Link className="dropdown-item" to={`/mozo/reporteCanceladas`}>Ver Canceladas</Link></li>
                  <li> <Link className="dropdown-item" to={`/mozo/reporteEntregadas`}>Ver Entregadas</Link></li>
                </ul>
              </li>
              <li className="nav-item me-3">
                <Link className="nav-link" to={`/`}>Salir</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
