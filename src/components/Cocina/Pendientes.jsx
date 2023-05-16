import React, { useState, useEffect } from 'react'
import { NavGestionCocina } from './NavGestionPedidos'
import { httpObtenerPedidos } from '../../api/api'
export const Pendientes = ({token}) => {

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
        <h1 className="text-center">Pendientes</h1>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
        {pedidos?.map((pedido) => (
          pedido.status == "pending"?
          <article  key={pedido.id} className="card mx-auto align-self-start mt-2">
            <div className="card-body">
              <h5 className="card-title">{pedido.client}</h5>
              <p className="card-text">{pedido.dateEntry}</p>
              <p className="card-text fw-bold">Pedido</p>
                  <ul className="product-pedidos list-group ">
                    {pedido.products?.map((producto, indice) => (
                      <li key={indice} className="list-group-item">{producto.product.name} {producto.qty}</li>
                    ))}
                  </ul>
            </div>
            <button className="btn  btn-success">Listo</button>
          </article>:
          ""
        ))}
          
        </section>
      </main>
    </>
  )
}
