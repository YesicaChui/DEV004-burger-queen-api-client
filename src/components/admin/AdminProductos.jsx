import { useEffect, useState } from "react";
import { NavAdmin } from "./NavAdmin"
import { httpObtenerProductos, httpEliminarProducto } from "../../api/api";
import { ProductoForm } from "./ProductoForm";

export const AdminProductos = ({ token }) => {

  // arreglo de objetos de los Productros
  const [productos, setProductos] = useState([])
  // objeto que representa a un producto
  const [producto, setProducto] = useState(null)
  // variable que representa si estamos editando o no
  const [isEdit, setIsEdit] = useState(false)
  // funciones usadas para el formulario
  const formFunciones = { leerProductos, cancelarEdicion, setProducto, token };

  async function leerProductos() {
    // peticion http para traer todos los productos
    setProductos(await httpObtenerProductos(token))
  }

  async function eliminarProducto(id) {
    // dialogo de confirmación si se pulso cancelar(retorna false) se ejecuta el return y ya no continua
    if (!confirm('¿Estás seguro de que deseas eliminar el producto?')) return
    // peticion http para eliminar un producto
    const respuesta = await httpEliminarProducto(token, id)
    // lee nuevamente a los productos
    await leerProductos()
  }

  async function activarEdicionProducto(idEdit, nombre, precio, imagen, tipo) {
        // lo scrollea la pantalla a la parte superior
    scrollTo(0, 0);
    // actualizo el objeto producto con los datos del elemento seleccionado
    setProducto({ idEdit, nombre, precio, imagen, tipo })
     // cambio estado de IsEdit a true para indicar que estoy editando
    setIsEdit(true)
  }

  function cancelarEdicion() {
    // cambio estado de IsEdit a false para indicar que no estoy editando
    setIsEdit(false)
    // limpio el objeto producto
    setProducto(null)    
  }
  //la primera vez que se llame al componente cargo los datos de los empleados
  // How to use async function in useEffect?
  // https://dev.to/jasmin/how-to-use-async-function-in-useeffect-5efc
  // useEffect(() => leerProductos() , [])
  useEffect(() => {
    const leer = async () => {
      await leerProductos();
    };
    leer();
  }, [])

  // const onSave = () => leerProductos()

  return (
    <>
      <NavAdmin />
      <section className="container p-3">
        <ProductoForm producto={producto} formFunciones={formFunciones} isEdit={isEdit} />
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
                {/* recorriendo todos los productos y mostrando en cada fila con los datos respectivos de cada producto */}
                {productos?.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.name}</td>
                    <td>{producto.price}</td>
                    <td><img src={producto.image} alt="Imagen del producto" className="imgProducto" /></td>
                    <td>{producto.type}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => activarEdicionProducto(producto.id, producto.name, producto.price, producto.image, producto.type)}>Editar</button>
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
