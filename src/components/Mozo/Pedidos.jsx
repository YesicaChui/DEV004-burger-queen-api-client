import React from 'react'
import { NavMozo } from './NavMozo'
import coffee from '../../assets/coffee.png'

export const Pedidos = () => {
  return (
    <>
      <NavMozo />
      <div className="container">
        <main className="d-flex justify-content-between">
          <section className="productos-orden d-flex justify-content-between flex-wrap col-6">
            <article className="card mx-auto text-center align-self-start mt-2 ">
              <img className="imgProductoMediano mx-auto mt-2" src={coffee} alt="" />
              <div className="card-body">
                <h5 className="card-title">Cafe</h5>
                <p className="card-text">10.0</p>
              </div>
            </article>
            <article className="card mx-auto text-center align-self-start mt-2">
              <img className="imgProductoMediano mx-auto mt-2" src={coffee} alt="" />
              <div className="card-body">
                <h5 className="card-title">Cafe</h5>
                <p className="card-text">10.0</p>
              </div>
            </article>
            <article className="card mx-auto text-center align-self-start mt-2 ">
              <img className="imgProductoMediano mx-auto mt-2" src={coffee} alt="" />
              <div className="card-body">
                <h5 className="card-title">Cafe</h5>
                <p className="card-text">10.0</p>
              </div>
            </article>
            <article className="card mx-auto text-center align-self-start mt-2">
              <img className="imgProductoMediano mx-auto mt-2" src={coffee} alt="" />
              <div className="card-body">
                <h5 className="card-title">Cafe</h5>
                <p className="card-text">10.0</p>
              </div>
            </article>



          </section>
          <section className="col-6 mt-2" >
            <div className="row ">
              <div className="w-100 px-2">
                <label htmlFor="cliente" className="fw-bold">Cliente</label>
                <input id="cliente" type="text" className="form-control mb-2" />
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src={coffee} alt="Imagen del producto" className="imgProducto" />
                      </td>
                      <td className="align-middle">5.0</td>
                      <td className="align-middle">3</td>
                      <td className="align-middle">
                        <button className="btn btn-warning btn-sm ms-1"><i className="bi bi-dash" /></button>
                        <button className="btn btn-danger btn-sm ms-1"><i className="bi bi-plus" /></button>
                        <button className="btn btn-danger btn-sm ms-1"><i className="bi bi-trash3" /></button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={coffee} alt="Imagen del producto" className="imgProducto" />
                      </td>
                      <td className="align-middle">5.0</td>
                      <td className="align-middle">3</td>
                      <td className="align-middle">
                        <button className="btn btn-warning btn-sm ms-1"><i className="bi bi-dash" /></button>
                        <button className="btn btn-danger btn-sm ms-1"><i className="bi bi-plus" /></button>
                        <button className="btn btn-danger btn-sm ms-1"><i className="bi bi-trash3" /></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-end fw-bold">
                  Total: S/.<span>10.0</span>
                </p>
                <button className="btn btn-primary btn-lg me-2">Enviar a Cocina</button>

              </div>
            </div>
          </section>
        </main>
      </div>

    </>
  )
}
