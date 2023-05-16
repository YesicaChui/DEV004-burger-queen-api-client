import React, { useState, useEffect } from 'react'
import { NavMozo } from './NavMozo'
import { httpObtenerPedidos } from '../../api/api'
export const ListaPedidos = ({ token }) => {

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
      <NavMozo />
      <main>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
          {pedidos?.map((pedido) => (

            pedido.status == "pending" || pedido.status == "delivering" ?
              <article key={pedido.id} className="card mx-auto align-self-start mt-2">
                <h2 className="card-header bg-success text-white">{pedido.status === "pending" ? "Pendiente" : "Listo"}</h2>
                <div className="card-body">
                  <h5 className="card-title">{pedido.client}</h5>
                  <p className="card-text">{pedido.dataEntry}</p>
                  <p className="card-text fw-bold">Pedido</p>
                  <ul className="product-pedidos list-group ">
                    {pedido.products?.map((producto, indice) => (
                      <li key={indice} className="list-group-item">{producto.product.name} {producto.qty}</li>
                    ))}
                  </ul>
                </div>
                <button className="btn btn-danger">{pedido.status === "pending" ? "Cancelar" : "Entregar"}</button>
              </article> :
              ""
          ))}


        </section>
      </main>
    </>
  )
}
