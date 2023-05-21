import React, { useState, useEffect } from 'react'
import { NavMozo } from './NavMozo'
import { httpObtenerPedidos } from '../../api/api'
import { CardPedido } from './CardPedido'
// recibimos el token y el tipoReporte que puede ser Canceled(Canceladas) o delivered(entregadas)
export const MozoCanceladasEntregadas = ({ token, tipoReporte }) => {
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

  return (
    <>
      <NavMozo />
      <main>
        {/* si es entregada muestro el titulo Entrgadas sino muestro Canceladas */}
        <h1 className='text-center '>{tipoReporte == "delivered" ? "Entregadas" : "Canceladas"}</h1>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
          {pedidos?.map((pedido) => (
            // si el estado es igual al reporte solicitado (cancelada o entregada)
            pedido.status == tipoReporte ?
              <article key={pedido.id} className="card mx-auto align-self-start mt-2">
                <CardPedido pedido={pedido} />
              </article> :
              ""
          ))}
        </section>
      </main>
    </>
  )
}
