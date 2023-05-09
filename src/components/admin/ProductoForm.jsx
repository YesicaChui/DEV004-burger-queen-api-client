import React from 'react'
import {   httpCrearProducto, httpActualizarProducto } from "../../api/api";

export const ProductoForm = ({producto,onSave,cancelarEdicion,setProducto,isEdit,token}) => {
  const {nombre,precio,imagen,tipo,idEdit}=producto||{nombre:"",precio:"",imagen:"",idEdit:"",tipo:""}
  async function guardarProducto(e) {
    e.preventDefault();
    if (!nombre) return alert("Debe ingresar un nombre")
    if (!precio) return alert("Debe ingresar un precio")
    if (!imagen) return alert("Debe seleccionar una url de imagen")
    if (!tipo) return alert("Debe seleccionar un tipo")
    const newProducto = {
      "name": nombre,
      "price": precio,
      "image": imagen,
      "type": tipo
    }
    if (!isEdit) {
      const data = await httpCrearProducto(token, newProducto)
      alert("Se inserto el producto con exito")
    } else {
      await httpActualizarProducto(token, newProducto,idEdit)
      alert("Se actualizo los datos del producto con exito")
    }
    onSave()
    cancelarEdicion()

  }

  return (
    <>
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
                {isEdit ? (<button type="button" className="btn btn-danger" onClick={cancelarEdicion}>Cancelar Edicion</button>) : ""}

              </div>
            </form>
          </div>
        </div>
    </>
    
  )
}
