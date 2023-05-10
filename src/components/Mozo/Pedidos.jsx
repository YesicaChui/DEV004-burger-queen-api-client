import React from 'react'
import { useEffect, useState } from "react";
import { NavMozo } from './NavMozo'
import coffee from '../../assets/coffee.png'
import { httpObtenerProductos,httpCrearPedido } from "../../api/api";

export const Pedidos = ({ token }) => {
  const [productos, setProductos] = useState([])
  const [productosPedido,setProductosPedido]=useState([])
  const [nombre,setNombre]=useState("")

  async function leerProductos() {
    setProductos(await httpObtenerProductos(token))
  }
  //la primera vez que se llame al componente cargo los datos de los empleados
  useEffect(() => {
    const leer = async () => {
      await leerProductos();
    };
    leer();
  }, [])

  function agregarAPedido(producto){
    setProductosPedido([...productosPedido,{qty:1,product:producto}])
  }

  async function crearPedido(){
    const pedido={client:nombre,products:productosPedido,status:"pending"}
    await httpCrearPedido(token,pedido)
    alert("Se Envio a cocina el Pedido")
  }
  return (
    <>
      <NavMozo />
      <div className="container">
        <main className="d-flex justify-content-between">
          <section className="productos-orden d-flex justify-content-between flex-wrap col-6">
            {productos?.map((producto) => (
              <article key={producto.id} className="card mx-auto text-center align-self-start mt-2 w-40" onClick={()=>agregarAPedido(producto)}>
                <img className="imgProductoMediano mx-auto mt-2" src={producto.image} alt="" />
                <div className="card-body">
                  <h5 className="card-title">{producto.name}</h5>
                  <p className="card-text">{producto.price}</p>
                </div>
              </article>


            ))}





          </section>
          <section className="col-6 mt-2 ms-2" >
            <div className="row ">
              <div className="w-100 px-2">
                <label htmlFor="cliente" className="fw-bold">Cliente</label>
                <input id="cliente" type="text" className="form-control mb-2" value={nombre} onChange={(e)=>setNombre(e.target.value)} />
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>

                  {productosPedido?.map((pedido,indice) => (
                    <tr key={indice}>
                      <td>
                        <img src={pedido.product.image} alt="Imagen del producto" className="imgProducto" />
                      </td>
                      <td className="align-middle">{pedido.product.price}</td>
                      <td className="align-middle">{pedido.qty}</td>
                      <td className="align-middle">
                        <button className="btn btn-warning btn-sm ms-1"><i className="bi bi-dash" /></button>
                        <button className="btn btn-danger btn-sm ms-1"><i className="bi bi-plus" /></button>
                        <button className="btn btn-danger btn-sm ms-1"><i className="bi bi-trash3" /></button>
                      </td>
                    </tr>


            ))}

                    

                  </tbody>
                </table>
                <p className="text-end fw-bold">
                  Total: S/.<span>{productosPedido.reduce((acumulador,elemento)=>acumulador+elemento.qty*elemento.product.price,0)}</span>
                </p>
                <button className="btn btn-primary btn-lg me-2" onClick={()=>crearPedido()}>Enviar a Cocina</button>

              </div>
            </div>
          </section>
        </main>
      </div>

    </>
  )
}
