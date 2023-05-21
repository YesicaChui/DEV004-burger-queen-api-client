import { useEffect, useState } from "react";
import { NavAdmin } from "./NavAdmin"
import { httpObtenerEmpleados, httpCrearEmpleado, httpEliminarEmpleado, httpActualizarEmpleado } from "../../api/api";
export const AdminEmpleados = ({ token }) => {
  // definicion de variable de estado
  // arreglo de objetos de los empleados
  const [empleados, setEmpleados] = useState([])
  // variable que define si estamos editando o no
  const [isEdit, setIsEdit] = useState(false)
  // variable para indicar el id del empleado que estamos editando
  const [idEdit, setIdEdit] = useState("")
  // variables de estado del empleado que se modificara
  const [correo, setCorreo] = useState("")
  const [rol, setRol] = useState("")
  const [contrasena, setContrasena] = useState("")

  // funcion llamada por el evento submit al pulsar Agregar Empleado
  async function guardarEmpleado(e) {
    // evita la recarga de la pagina - evita el comportamiento normal del evento
    e.preventDefault();
    // si alguno de los 3 datos no tiene valor no se permite continuar
    if (!correo) return alert("Debe ingresar su correo")
    if (!contrasena) return alert("Debe ingresar una contraseña")
    if (!rol) return alert("Debe seleccionar un rol")
    // creo el objeto usuario segun formato del api
    const usuario = {
      "email": correo,
      "password": contrasena,
      "role": rol
    }    
    if (!isEdit) {
      // si no estoy editando creo el empleado
      await httpCrearEmpleado(token, usuario)
      alert("Se inserto al empleado con exito")     
    } else {
       //caso contrario actualizo el empleado
      await httpActualizarEmpleado(token, usuario, idEdit)
      alert("Se actualizo los datos del empleado con exito")
    }
    // limpio los datos con la funcion cancelarEdicion()
    cancelarEdicion()
    // vuelvo a leer a los empleados
    await leerEmpleados()
  }
  
  async function leerEmpleados() {
    // hago la peticion http y actulizo el arreglo de objetos de empleados
    setEmpleados(await httpObtenerEmpleados(token))
  }

  async function eliminarEmpleado(id) {
    // dialogo de confirmación si se pulso cancelar(retorna false) se ejecuta el return y ya no continua
    if (!confirm('¿Estás seguro de que deseas eliminar al empleado?')) return
    // peticion http para eliminar un empleado
    await httpEliminarEmpleado(token, id)
    // lee nuevamente a los empleados
    await leerEmpleados()
  }

  // al activar Edición se visualiza el boton cancelar, 
  // se visualiza el boton guardar y los datos del empleado se ponen en los inputs
   async function activarEdicionEmpleado(id, correo, rol) {
    // lo scrollea la pantalla a la parte superior
    scrollTo(0, 0);
    // cambio estado de IsEdit a true para indicar que estoy editando
    setIsEdit(true)
    setIdEdit(id)
    setCorreo(correo)
    setRol(rol)
  }

  // desactiva el boton cancelar y vuelve como al inicio y limpia los inputs
  function cancelarEdicion() {
    // cambio estado de IsEdit a false para indicar que no estoy editando
    setIsEdit(false)
    // limpio los inputs
    setCorreo("")
    setRol("")
    setContrasena("")
  }

  //la primera vez que se llame al componente cargo los datos de los empleados
  // How to use async function in useEffect?
  // https://dev.to/jasmin/how-to-use-async-function-in-useeffect-5efc
  useEffect(() => {
    const leer = async () => {
      await leerEmpleados();
    };
    leer();
  }, [])


  return (
    <>
      <NavAdmin />
      <section className="container p-3">
        {/* Si estamos editando se muestra Guardar Empleado sino se muestra el texto Agregar Empleado*/}
        <h2 className="text-center mb-4">{isEdit ? "Guardar Empleado" : "Agregar Empleados"} </h2>
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <form className="bg-dark p-3 rounded" onSubmit={(e) => guardarEmpleado(e)}>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label text-white">Correo</label>
                <input
                  type="text"
                  id="correo"
                  className="form-control"
                  name="Correo"
                  value={correo}
                  // actualizo la variable de estado correo cuando cambie el texto
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label text-white">Contraseña</label>
                <input type="password" id="contrasena" className="form-control" name="Contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="rol" className="form-label text-white">Rol</label>
                <select id="rol" className="form-select" name="Rol" value={rol} onChange={(e) => setRol(e.target.value)}>
                  <option value="" disabled>Selecciona un rol</option>
                  <option value="chef">Chef</option>
                  <option value="waiter">Waiter</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-success" >{isEdit ? "Guardar Empleado" : "Agregar Empleado"}</button>
                {/*Si estoy editando se muestra el boton de cancelar */}
                {isEdit ? (<button type="button" className="btn btn-danger" onClick={cancelarEdicion}>Cancelar Edicion</button>) : ""}

              </div>
            </form>
          </div>
        </div>
        <h2 className="text-center my-4">Administrar Empleados</h2>
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* recorriendo todos los empleados y mostrando en cada fila con los datos respectivos de cada empleado*/}
                {empleados?.map((empleado) => (
                  <tr key={empleado.id}>
                    <td>{empleado.email}</td>
                    <td>{empleado.role}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => activarEdicionEmpleado(empleado.id, empleado.email, empleado.role)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</button>
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
