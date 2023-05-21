import { useState, useEffect } from 'react'
import { NavGestionCocina } from './NavGestionPedidos'
import { httpObtenerPedidos } from '../../api/api'
import moment from 'moment/moment';
export const Completadas = ({token}) => {
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

  // funcion para calcular la diferencia entre fechas en minutos
  function diferenciaFechasMinutos(dateEntry,dateProcessed){
    // leo los datos de entrada en el formato deseado
    let fecha1 = moment(dateEntry, 'YYYY-MM-DD HH:mm:ss');
    let fecha2 = moment(dateProcessed, 'YYYY-MM-DD HH:mm:ss');
    // calculo de la difencia en minutos
    let diff = fecha2.diff(fecha1, 'minutes');
    // retorno la diferencia
    return diff
  }
  return (
    <>
      <NavGestionCocina/>
      <main>
        <h1  className="text-center">Completadas</h1>
        <section className="productos-orden d-flex justify-content-between flex-wrap">
        {pedidos?.map((pedido) => (
          pedido.status == "delivered"|| pedido.status == "delivering"?
         
          <article key={pedido.id} className="card mx-auto align-self-start mt-2">           
            <h2 className="card-header bg-warning text-white">{diferenciaFechasMinutos(pedido.dateEntry,pedido.dateProcessed)} min</h2>
            <div className="card-body">
              <h5 className="card-title">{pedido.client}</h5>
              <p className="card-text"><b>Ingreso:</b> {pedido.dateEntry}</p>
              <p className="card-text"><b>Finalizado:</b> {pedido.dateProcessed}</p>
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

