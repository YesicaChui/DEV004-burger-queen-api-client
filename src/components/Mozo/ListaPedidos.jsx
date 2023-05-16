import React, { useState, useEffect } from 'react'
import { NavMozo } from './NavMozo'
import { httpObtenerPedidos, httpActualizarPedido } from '../../api/api'
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

  async function actualizarPedido(id,estado){
    const status={
      "status": estado
    }
    await httpActualizarPedido(token,status,id)
    await leerPedidos()
  }

  return (
    <>
      <NavMozo />
      <main>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
          {pedidos?.map((pedido) => (

            pedido.status == "pending" || pedido.status == "delivering" ?
              <article key={pedido.id} className="card mx-auto align-self-start mt-2">
                {pedido.status === "pending" ? <h2 className="card-header bg-warning text-white">Pendiente</h2> : ""}
                {pedido.status === "delivering" ? <h2 className="card-header bg-success text-white">Listo</h2> : ""}
                
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
                {pedido.status === "pending" ?  <button className="btn btn-danger" onClick={()=>actualizarPedido(pedido.id,"canceled")}>Cancelar</button> : ""}
                {pedido.status === "delivering" ?  <button className="btn btn-primary" onClick={()=>actualizarPedido(pedido.id,"delivered")}>Entregar</button> : ""}
              </article> :
              ""
          ))}


        </section>
      </main>
    </>
  )
}
