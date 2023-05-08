import React from 'react'
import { NavMozo } from './NavMozo'

export const ListaPedidos = () => {
  return (
    <>
      <NavMozo />
      <main>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
          <article className="card mx-auto align-self-start mt-2">
            <h2 className="card-header bg-warning text-white">Pendiente</h2>
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
            <button className="btn btn-danger">Cancelar</button>
          </article>
          <article className="card mx-auto  align-self-start mt-2">
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
          </article>
        </section>
      </main>
    </>
  )
}
