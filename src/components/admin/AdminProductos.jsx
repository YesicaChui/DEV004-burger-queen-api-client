import { NavAdmin } from "./NavAdmin"

export const AdminProductos = () => {
  return (
    <>
      <NavAdmin />
      <section>
        <h2>Agregar Productos</h2>
        <form class="bg-dark p-3">
          <div class="mb-3">
            <label htmlFor="correo" class="form-label text-white">Correo</label>
            <input type="text" id="correo" class="form-control" />
            <label htmlFor="contrasena" class="form-label text-white">Contraseña</label>
            <input type="password" id="contrasena" class="form-control" />
            <label htmlFor="rol" class="form-label text-white">Rol</label>
            <input type="text" id="rol" class="form-control" />
          </div>

          <button class="btn btn-success">Agregar Producto</button>
        </form>
      </section>
      <section>
        <h2>Administrar Empleados</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th colSpan={2}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>chef@burger.com</td>
              <td>Chef</td>
              <td><button>Editar</button></td>
              <td><button>Eliminar</button></td>
            </tr>
            <tr>
              <td>waiter@burger.com</td>
              <td>Waiter</td>
              <td><button>Editar</button></td>
              <td><button>Eliminar</button></td>
            </tr>
          </tbody>
        </table>
      </section>
    </>

  )
}
