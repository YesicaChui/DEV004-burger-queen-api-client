import { httpCrearProducto, httpActualizarProducto } from "../../api/api";

export const ProductoForm = ({producto,formFunciones,isEdit}) => {
  // si producto es null le damos un objeto con valores por defecto
  const {nombre,precio,imagen,tipo,idEdit}=producto||{nombre:"",precio:"",imagen:"",idEdit:"",tipo:""}
  // son un objeto de funciones entregadas por el padre
  const { leerProductos:guardar, cancelarEdicion, setProducto, token } = formFunciones;

  async function guardarProducto(e) {
    // evita que se actualice la pagina
    e.preventDefault();
    // Verifico si los campos nombre, precio, imagen tipo no esten vacios para continuar sino le envio un alerta
    if (!nombre) return alert("Debe ingresar un nombre")
    if (!precio) return alert("Debe ingresar un precio")
    if (!imagen) return alert("Debe seleccionar una url de imagen")
    if (!tipo) return alert("Debe seleccionar un tipo")
    // genero un objeto de producto en el formato requerido según el api
    const newProducto = {
      "name": nombre,
      "price": precio,
      "image": imagen,
      "type": tipo
    }
    
    if (!isEdit) {
      // si no estoy editando creo el producto
      await httpCrearProducto(token, newProducto)
      alert("Se inserto el producto con exito")
    } else {
      // si estoy editando actualizo el producto
      await httpActualizarProducto(token, newProducto,idEdit)
      alert("Se actualizo los datos del producto con exito")
    }
    // le avisamos que terminamos de guardar al padre para que lea los productos nuevamente
    guardar()
    // limpio los input al llamar a cancelar y restauro los botones
    cancelarEdicion()
  }

  return (
    <>
      {/* si estamos editando mostrar texto Guardar Producto sino mostrar el texto Agregar Producto */}
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
                  // Actualizo el objeto producto y cambio solo el nombre
                  onChange={(e) => setProducto({...producto,nombre:e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="precio" className="form-label text-white">Precio</label>
                <input type="precio" id="precio" className="form-control" name="precio" value={precio} onChange={(e)=>setProducto({...producto,precio:e.target.value})}/>
              </div>
              <div className="mb-3">
                <label htmlFor="imagen" className="form-label text-white">Imagen</label>
                <input type="imagen" id="imagen" className="form-control" name="imagen" value={imagen} onChange={(e)=>setProducto({...producto,imagen:e.target.value})}/>
              </div>
              <div className="mb-3">
                <label htmlFor="tipo" className="form-label text-white">Tipo</label>
                <select id="tipo" className="form-select" name="tipo" value={tipo} onChange={(e)=>setProducto({...producto,tipo:e.target.value})}>
                  <option value="" disabled>Selecciona un Tipo</option>
                  <option value="desayuno">Desayuno</option>
                  <option value="almuerzo">Almuerzo</option>
                  <option value="cena">Cena</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-success" >{isEdit ? "Guardar Producto" : "Agregar Producto"}</button>
                {/*Si estoy editando se muestra el boton de cancelar */}
                {isEdit ? (<button type="button" className="btn btn-danger" onClick={cancelarEdicion}>Cancelar Edicion</button>) : ""}

              </div>
            </form>
          </div>
        </div>
    </>
    
  )
}
