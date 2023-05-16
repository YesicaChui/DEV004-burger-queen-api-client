import React, { useState, useEffect } from 'react'
import { NavGestionCocina } from './NavGestionPedidos'
import { httpObtenerPedidos } from '../../api/api'
import moment from 'moment/moment';
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

  function diferenciaFechasMinutos(dateEntry,dateProcessed){
    let fecha1 = moment(dateEntry, 'YYYY-MM-DD HH:mm:ss');
    let fecha2 = moment(dateProcessed, 'YYYY-MM-DD HH:mm:ss');
    let diff = fecha2.diff(fecha1, 'minutes');
    return diff
  }
  return (
    <>
      <NavGestionCocina/>
      <main>
        <h1  className="text-center">Completadas</h1>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
        {pedidos?.map((pedido) => (
          pedido.status == "delivered"?
         
          <article key={pedido.id} className="card mx-auto align-self-start mt-2">           
            <h2 className="card-header bg-warning text-white">{diferenciaFechasMinutos(pedido.dateEntry,pedido.dateProcessed)} min</h2>
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
          
          </article>:
          ""
        ))}
        </section>
      </main>
    </>
  )
}
