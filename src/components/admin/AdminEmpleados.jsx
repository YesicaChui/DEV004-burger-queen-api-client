import { useEffect, useState } from "react";
import { NavAdmin } from "./NavAdmin"
import { httpObtenerEmpleados, httpCrearEmpleado, httpEliminarEmpleado,httpActualizarEmpleado } from "../../api/api";
export const AdminEmpleados = ({ token }) => {

  const [empleados, setEmpleados] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [idEdit, setIdEdit] = useState("")
  const [correo, setCorreo] = useState("")
  const [rol, setRol] = useState("")
  const [contrasena, setContrasena]=useState("")
  async function guardarEmpleado(e) {
    e.preventDefault();
    if (!e.target.elements.correo.value) return alert("Debe ingresar su correo")
    if (!e.target.elements.contrasena.value) return alert("Debe ingresar una contraseña")
    if (!e.target.elements.rol.value) return alert("Debe seleccionar un rol")
    const usuario = {
      "email": e.target.elements.correo.value,
      "password": e.target.elements.contrasena.value,
      "role": e.target.elements.rol.value
    }
    if (!isEdit) {
      const data = await httpCrearEmpleado(token, usuario)
      alert("Se inserto al empleado con exito")
    } else {
      await httpActualizarEmpleado(token, usuario,idEdit)
      alert("Se actualizo los datos del empleado con exito")
    }
    cancelarEdicion()
    await leerEmpleados()
  }

  async function leerEmpleados() {
    setEmpleados(await httpObtenerEmpleados(token))
  }

  async function eliminarEmpleado(id) {
    console.log(id)
    if (!confirm('¿Estás seguro de que deseas eliminar al empleado?')) return
    const respuesta = await httpEliminarEmpleado(token, id)
    console.log(`mirespuesta ${respuesta.status}`)
    await leerEmpleados()
  }

  async function activarEdicionEmpleado(id,correo,rol) {
    scrollTo(0, 0);
    setIsEdit(true)
    setIdEdit(id)
    setCorreo(correo)
    setRol(rol)
  }

  function cancelarEdicion() {
    setIsEdit(false)
    setCorreo("")
    setRol("")
    setContrasena("")
  }

  //la primera vez que se llame al componente cargo los datos de los empleados
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
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label text-white">Contraseña</label>
                <input type="password" id="contrasena" className="form-control" name="Contrasena" value={contrasena} onChange={(e)=>setContrasena(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="rol" className="form-label text-white">Rol</label>
                <select id="rol" className="form-select" name="Rol" value={rol} onChange={(e)=>setRol(e.target.value)}>
                  <option value="" disabled>Selecciona un rol</option>
                  <option value="chef">Chef</option>
                  <option value="waiter">Waiter</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-success" >{isEdit ? "Guardar Empleado" : "Agregar Empleado"}</button>
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
                {empleados.map((empleado) => (
                  <tr key={empleado.id}>
                    <td>{empleado.email}</td>
                    <td>{empleado.role}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => activarEdicionEmpleado(empleado.id,empleado.email,empleado.role)}>Editar</button>
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
