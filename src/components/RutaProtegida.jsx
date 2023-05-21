import { Navigate, Outlet } from 'react-router-dom'
export const RutaProtegida = ({ isLogin, redirectTo = "/" }) => {
  // si no estoy logeado navego a login
  if (!isLogin) return <Navigate to={redirectTo} />
  // si estoy logeado navego a la ruta que quiero ir
  return <Outlet />
}
