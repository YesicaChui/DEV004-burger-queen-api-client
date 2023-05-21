import { useState, useEffect } from 'react'
import { NavMozo } from './NavMozo'
import { httpObtenerPedidos, httpActualizarPedido } from '../../api/api'
import { CardPedido } from './CardPedido'
export const ListaPedidos = ({ token }) => {

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

  // funcion que actualiza el estado del pedido a cancelado o a entregado
  async function actualizarPedido(id, estado) {
    // creo el objeto status que va a actualizar al pedido
    const status = {
      "status": estado
    }
    // peticion http para actualizar el pedido
    setPedidos(await httpObtenerPedidos(token))
    await httpActualizarPedido(token, status, id)
    // vuelvo a leer los pedidos
    await leerPedidos()
  }

  return (
    <>
      <NavMozo />
      <main>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
          {/* Ordenar los pedidos la funcion localCompare ayuda a que se ordene alfabeticamente a-z */}
          {pedidos?.sort((a, b) => a.status.localeCompare(b.status)).map((pedido) => (
            // si el estado del pedido es pendiente(pending) o listo(delivering) pinto el pedido
            pedido.status == "pending" || pedido.status == "delivering" ?
              <article key={pedido.id} className="card mx-auto align-self-start mt-2">
                {/* segun el estado pending o delivering muestro el h2 con el formato y texto correspondiente */}
                {pedido.status === "pending" ? <h2 className="card-header bg-warning text-white">Pendiente</h2> : ""}
                {pedido.status === "delivering" ? <h2 className="card-header bg-success text-white">Listo</h2> : ""}
                <CardPedido pedido={pedido} />
                {/* segun el estado pending o delivering muestro el boton con el formato y texto correspondiente */}
                {pedido.status === "pending" ? <button className="btn btn-danger" onClick={() => actualizarPedido(pedido.id, "canceled")}>Cancelar</button> : ""}
                {pedido.status === "delivering" ? <button className="btn btn-primary" onClick={() => actualizarPedido(pedido.id, "delivered")}>Entregar</button> : ""}
              </article> :
              ""
          ))}
        </section>
      </main>
    </>
  )
}
