import { NavAdmin } from "./NavAdmin"

export const AdminEmpleados = ({token}) => {  

  return (
    <>
      <NavAdmin />
      <section className="container p-3">
        <h2 className="text-center mb-4">Agregar Empleados </h2>
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <form className="bg-dark p-3 rounded">
              <div className="mb-3">
                <label htmlFor="correo" className="form-label text-white">Correo</label>
                <input type="text" id="correo" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="contrasena" className="form-label text-white">Contraseña</label>
                <input type="password" id="contrasena" className="form-control" />
              </div>
              <div className="mb-3">
                <label htmlFor="rol" className="form-label text-white">Rol</label>
                <select id="rol" className="form-select">
                  <option selected disabled>Selecciona un rol</option>
                  <option value="chef">Chef</option>
                  <option value="waiter">Waiter</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="button" className="btn btn-success">Agregar Empleado</button>
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
                <tr>
                  <td>chef@burger.com</td>
                  <td>Chef</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2">Editar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>waiter@burger.com</td>
                  <td>Waiter</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2">Editar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
