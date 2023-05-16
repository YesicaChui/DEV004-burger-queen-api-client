import React, { useState, useEffect } from 'react'
import { NavGestionCocina } from './NavGestionPedidos'
import { httpObtenerPedidos } from '../../api/api'

export const Completadas = ({token}) => {
  const [pedidos, setPedidos] = useState([])

  async function leerPedidos() {
    setPedidos(await httpObtenerPedidos(token))
  }
  useEffect(() => {
    const leer = async () => {
      await leerPedidos();
    };
    leer();
  }, [])
  return (
    <>
      <NavGestionCocina/>
      <main>
        <h1  className="text-center">Completadas</h1>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
        {pedidos?.map((pedido) => (
          pedido.status == "delivered"?
         
          <article className="card mx-auto align-self-start mt-2">
            <h2 className="card-header bg-warning text-white">12 min</h2>
            <div className="card-body">
              <h5 className="card-title">Willy</h5>
              <p className="card-text">2023-05-01 12:09:48</p>
              <p className="card-text fw-bold">Pedido</p>
              <ul className="product-pedidos list-group ">              
                <li className="list-group-item">Hamburguesa 1</li>
                <li className="list-group-item">Coca Cola 2</li>
                <li className="list-group-item">Cafe</li>
              </ul>
            </div>
          
          </article>:
          ""
        ))}
        </section>
      </main>
    </>
  )
}
