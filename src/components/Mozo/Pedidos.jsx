import React, { useEffect, useState } from "react";
import { NavMozo } from './NavMozo'
import { httpObtenerProductos, httpCrearPedido } from "../../api/api";
import moment from 'moment/moment';

export const Pedidos = ({ token }) => {
  // variable de estado donde guardo los productos
  const [productos, setProductos] = useState([])
  // variable de estado que guarda todos los productos del pedido seleccionados incluyendo la cantidad de cada producto
  const [productosPedido, setProductosPedido] = useState([])
  // variable de estado del nombre del cliente
  const [nombre, setNombre] = useState("")

  async function leerProductos() {
    // peticion http para traer todos los productos
    setProductos(await httpObtenerProductos(token))
  }
  //la primera vez que se llame al componente cargo los datos de los productos
  useEffect(() => {
    const leer = async () => {
      await leerProductos();
    };
    leer();
  }, [])


  function agregarAPedido(producto) {
    // busco el indice del producto en los productos del pedido
    // para comparar objetos uso JSON.stringify para volverlo un texto y comparar los String
    const indiceProducto = productosPedido.findIndex((elementoProducto) => JSON.stringify(producto) === JSON.stringify(elementoProducto.product))
    if (indiceProducto === -1)
      // si no se encontro el producto el indice es -1 entonces agrego el producto a los productos del pedido
      // pongo el formato segun la api del objeto qty = cantidad y product que es el objeto del Producto seleccionado
      setProductosPedido([...productosPedido, { qty: 1, product: producto }])
    else {
      // si el producto existe incremento en uno el qty(cantidad) del producto
      incrementarUnProductoAPedido(indiceProducto)
    }
  }

  function incrementarUnProductoAPedido(indiceProducto) {
    // hago una copia de los productos del pedido
    const copiaProductosPedido = [...productosPedido]
    // incremento en uno la cantidad del producto encontrado
    copiaProductosPedido[indiceProducto].qty++
    // actualizo ProductosPedido con el producto seleccionado actualizado
    setProductosPedido(copiaProductosPedido)
  }

  function disminuirrUnProductoAPedido(indiceProducto) {
    // hago una copia de los productos del pedido
    const copiaProductosPedido = [...productosPedido]
    // si la cantidad es 1 no disminuimos 
    if (copiaProductosPedido[indiceProducto].qty === 1) return
    // disminuimos la cantidad de productos en 1
    copiaProductosPedido[indiceProducto].qty--
    // actualizo ProductosPedido con el producto seleccionado actualizado
    setProductosPedido(copiaProductosPedido)
  }

  function eliminarProductoDePedido(indiceProducto) {
    // hago una copia de los productos del pedido
    const copiaProductosPedido = [...productosPedido]
    // elimino un producto segun su indice
    copiaProductosPedido.splice(indiceProducto, 1)
    // actulizo los productos del pedido
    setProductosPedido(copiaProductosPedido)
  }

  async function crearPedido() {
    // valido que el nombre no este vacio para continuar
    if (nombre === "") return alert("Debe poner un nombre al pedido")
    // traemos la fecha y hora actual en el formato deseado con la libreria moment
    const fechaHoraActual = moment().format('YYYY-MM-DD HH:mm:ss')
    // creo el objeto pedido en el formato de la api
    const pedido = {
      client: nombre,
      products: productosPedido,
      status: "pending",
      dateEntry: fechaHoraActual
    }
    // hacemos la peticion http con el pedido
    await httpCrearPedido(token, pedido)

    setProductosPedido([])
    setNombre("")
    alert("Se Envio a cocina el Pedido")
  }
  return (
    <>
      <NavMozo />
      <div className="container">
        <main className="d-flex justify-content-between">
          <section className="productos-orden d-flex justify-content-between flex-wrap col-6">
            {/* Pintando productos disponibles */}
            {productos?.map((producto) => (
              <article key={producto.id} className="card mx-auto text-center align-self-start mt-2 w-40" onClick={() => agregarAPedido(producto)}>
                <img className="imgProductoMediano mx-auto mt-2" src={producto.image} alt={`Producto ${producto.name}`} />
                <div className="card-body">
                  <h5 className="card-title">{producto.name}</h5>
                  <p className="card-text">{producto.price}</p>
                </div>
              </article>
            ))}
          </section>
          <section className="col-6 mt-2 ms-2 pedido-orden" >
            <div className="row ">
              <div className="w-100 px-2">
                <label htmlFor="cliente" className="fw-bold">Cliente</label>
                {/* Se agrega el data-testid para seleccionarlo desde el test */}
                <input data-testid={`input-cliente`} id="cliente" type="text" className="form-control mb-2" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* lista de los productos del pedido*/}
                    {productosPedido?.map((pedido, indice) => (
                      <tr key={indice}>
                        <td>
                          <img src={pedido.product.image} alt={`Orden ${pedido.product.name}`} className="imgProducto" />
                        </td>
                        <td className="align-middle">{pedido.product.price}</td>
                        {/* se agrega data-testid para seleccionar la cantidad desde el test */}
                        <td className="align-middle" data-testid={`cantidad ${indice}`} >{pedido.qty}</td>
                        <td className="align-middle">
                          {/* se agrega aparte de las funciones onclick el atributo para el test data-testid */}
                          <button className="btn btn-warning btn-sm ms-1" onClick={() => disminuirrUnProductoAPedido(indice)} data-testid={`disminuir ${indice}`}><i className="bi bi-dash" /></button>
                          <button className="btn btn-danger btn-sm ms-1" onClick={() => incrementarUnProductoAPedido(indice)} data-testid={`aumentar ${indice}`}><i className="bi bi-plus" /></button>
                          <button className="btn btn-danger btn-sm ms-1" onClick={() => eliminarProductoDePedido(indice)} data-testid={`borrar ${indice}`}><i className="bi bi-trash3" /></button>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
                <p className="text-end fw-bold">
                  {/* calculando el Total de la orden a pagar por el cliente resultado de cantidadXprecio de todos los productos */}
                  Total: S/.<span>{productosPedido.reduce((acumulador, elemento) => acumulador + elemento.qty * elemento.product.price, 0)}</span>
                </p>
                <button className="btn btn-primary btn-lg me-2" onClick={() => crearPedido()} data-testid={`boton-pedido`} >Enviar a Cocina</button>

              </div>
            </div>
          </section>
        </main>
      </div>

    </>
  )
}
