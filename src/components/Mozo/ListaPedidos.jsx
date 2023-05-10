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
            </article>
          ))}

          {/*           <article className="card mx-auto  align-self-start mt-2">
            <h2 className="card-header bg-success text-white">Listo</h2>
            <div className="card-body">
              <h5 className="card-title">Vilma</h5>
              <p className="card-text">2023-05-02 10:09:48</p>
              <p className="card-text fw-bold">Pedido</p>
              <ul className="product-pedidos list-group ">
                <li className="list-group-item">Pedido</li>
                <li className="list-group-item">Chocalte 1</li>
                <li className="list-group-item">Sandwich de Pollo 1<span>2</span></li>
              </ul>
            </div>
            <button className="btn btn-primary">Entregar</button>
          </article>
          <article className="card mx-auto align-self-start mt-2">
            <h2 className="card-header bg-warning text-white">Pendiente</h2>
            <div className="card-body">
              <h5 className="card-title">Yesica</h5>
              <p className="card-text">2023-05-03 9:09:48</p>
              <p className="card-text fw-bold">Pedido</p>
              <ul className="product-pedidos list-group ">
                <li className="list-group-item">Pedido</li>
                <li className="list-group-item">Hot Dog 1<span>1</span></li>
                <li className="list-group-item">Coca Cola 2<span>2</span></li>
                <li className="list-group-item">Leche 3</li>
              </ul>
            </div>
            <button className="btn btn-danger">Cancelar</button>
          </article> */}
        </section>
      </main>
    </>
  )
}
