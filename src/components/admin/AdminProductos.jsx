import { useEffect, useState } from "react";
import { NavAdmin } from "./NavAdmin"
import {  httpObtenerProductos, httpCrearProducto, httpEliminarProducto, httpActualizarProducto } from "../../api/api";

export const AdminProductos = ({ token }) => {
 
  const [productos, setProductos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [idEdit, setIdEdit] = useState("")
  const [nombre, setNombre] = useState("")
  const [tipo, setTipo] = useState("")
  const [precio, setPrecio]=useState("")
  const [imagen, setImagen]=useState("")
  async function guardarProducto(e) {
    e.preventDefault();
    if (!nombre) return alert("Debe ingresar un nombre")
    if (!precio) return alert("Debe ingresar un precio")
    if (!imagen) return alert("Debe seleccionar una url de imagen")
    if (!tipo) return alert("Debe seleccionar un tipo")
    const producto = {
      "name": nombre,
      "price": precio,
      "image": imagen,
      "type": tipo
    }
    if (!isEdit) {
      const data = await httpCrearProducto(token, producto)
      alert("Se inserto el producto con exito")
    } else {
      await httpActualizarProducto(token, producto,idEdit)
      alert("Se actualizo los datos del producto con exito")
    }
    cancelarEdicion()
    await leerProductos()
  }

  async function leerProductos() {
    setProductos(await httpObtenerProductos(token))
  }

  async function eliminarProducto(id) {
    console.log(id)
    if (!confirm('¿Estás seguro de que deseas eliminar el producto?')) return
    const respuesta = await httpEliminarProducto(token, id)
    console.log(`mirespuesta ${respuesta.status}`)
    await leerProductos()
  }

  async function activarEdicionProducto(id,nombre,precio,imagen,tipo) {
    scrollTo(0, 0);
    setIsEdit(true)
    setIdEdit(id)
    setNombre(nombre)
    setPrecio(precio)
    setImagen(imagen)
    setTipo(tipo)
  }

  function cancelarEdicion() {
    setIsEdit(false)
    setNombre("")
    setPrecio("")
    setImagen("")
    setTipo("")
  }

  //la primera vez que se llame al componente cargo los datos de los empleados
  useEffect(() => {
    const leer = async () => {
      await leerProductos();
    };
    leer();
  }, [])


  return (
    <>
      <NavAdmin />
      <section className="container p-3">
        <h2 className="text-center mb-4">{isEdit ? "Guardar Producto" : "Agregar Productos"} </h2>
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <form className="bg-dark p-3 rounded" onSubmit={(e) => guardarProducto(e)}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label text-white">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="precio" className="form-label text-white">Precio</label>
                <input type="precio" id="precio" className="form-control" name="precio" value={precio} onChange={(e)=>setPrecio(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="imagen" className="form-label text-white">Imagen</label>
                <input type="imagen" id="imagen" className="form-control" name="imagen" value={imagen} onChange={(e)=>setImagen(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="tipo" className="form-label text-white">Tipo</label>
                <select id="tipo" className="form-select" name="tipo" value={tipo} onChange={(e)=>setTipo(e.target.value)}>
                  <option value="" disabled>Selecciona un Tipo</option>
                  <option value="desayuno">Desayuno</option>
                  <option value="almuerzo">Almuerzo</option>
                  <option value="cena">Cena</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-success" >{isEdit ? "Guardar Producto" : "Agregar Producto"}</button>
                {isEdit ? (<button type="button" className="btn btn-danger" onClick={cancelarEdicion}>Cancelar Edicion</button>) : ""}

              </div>
            </form>
          </div>
        </div>
        <h2 className="text-center my-4">Administrar Productos</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {productos?.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.name}</td>
                    <td>{producto.price}</td>
                    <td><img src={producto.image} alt="Imagen del producto" className="imgProducto"/></td>
                    <td>{producto.type}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => activarEdicionProducto(producto.id,producto.name,producto.price, producto.image, producto.type)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
