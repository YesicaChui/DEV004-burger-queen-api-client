import { Link } from "react-router-dom"
export const NavAdmin = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/admin/empleados`}>Empleados</Link>          
        </li>
        <li>
          <Link to={`/admin/productos`}>Productos</Link>
        </li>
      </ul>
    </nav>
  )
}
