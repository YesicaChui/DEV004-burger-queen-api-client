import { useState, useEffect } from 'react'
import { NavGestionCocina } from './NavGestionPedidos'
import { httpObtenerPedidos, httpActualizarPedido } from '../../api/api'
import moment from 'moment/moment';
export const Pendientes = ({ token }) => {
  // arreglo de objetos de los pedidos
  const [pedidos, setPedidos] = useState([])

  async function leerPedidos() {
    // peticion http para traer todos los pedidos
    setPedidos(await httpObtenerPedidos(token))
  }

  //la primera vez que se llame al componente cargo los datos de los pedidos
  useEffect(() => {
    const leer = async () => {
      await leerPedidos();
    };
    leer();
  }, [])

  async function actualizarPedido(id) {
    // capturar hora y fecha actual en el formato especificado
    const fechaHoraActual = moment().format('YYYY-MM-DD HH:mm:ss')
    // creo un objeto status que actualiza el estado del pedido a listo(delivering) y guarda la hora que termino de prepar el pedido
    const status = {
      "status": "delivering",
      "dateProcessed": fechaHoraActual
    }
    // peticion http para actualizar el pedido
    await httpActualizarPedido(token, status, id)
    // vuelvo a leer el pedido y repintar
    await leerPedidos()
  }

  return (
    <>
      <NavGestionCocina />
      <main>
        <h1 className="text-center">Pendientes</h1>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
          {pedidos?.map((pedido) => (
            // si el estado del pedido es pendiente(pending) pinto el pedido
            pedido.status == "pending" ?
              <article key={pedido.id} className="card mx-auto align-self-start mt-2">
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
                <button className="btn  btn-success" onClick={() => actualizarPedido(pedido.id)}>Listo</button>
              </article> :
              ""
          ))}

        </section>
      </main>
    </>
  )
}
