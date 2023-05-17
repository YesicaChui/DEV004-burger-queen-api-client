import  { useState, useEffect } from 'react'
import { NavMozo } from './NavMozo'
import { httpObtenerPedidos } from '../../api/api'
import { CardPedido } from './CardPedido'
export const MozoCanceladasEntregadas = ({ token, tipoReporte }) => {
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
        <h1 className='text-center '>{tipoReporte=="delivered"?"Entregadas":"Canceladas"}</h1>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
          {pedidos?.map((pedido) => (

            pedido.status ==tipoReporte ?
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
