import { NavAdmin } from "./NavAdmin"

export const AdminEmpleados = () => {
  return (
    <>
      <NavAdmin/>
      <h1>Empleados</h1>
{/*       <div>
        <h1>To-do List</h1>
        <div className='contenedorFormulario'>
          <Formulario
            tarea={tarea}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>
        <div className='contenedorTareas'>
          <h2>Lista de Tareas</h2>
          {
            listadoTareas.map(tarea=>
              <Tarea
                key={tarea.id}
                id={tarea.id}
                tarea={tarea}
                onActualizarTarea={onActualizarTarea}
                onBorrarTarea={onBorrarTarea}
              />
            )
          }
        </div>
      </div> */}
    </>
  )
}
