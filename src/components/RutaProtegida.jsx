import { Navigate, Outlet } from 'react-router-dom'
export const RutaProtegida = ({ isLogin, redirectTo = "/" }) => {
  if (!isLogin) return <Navigate to={redirectTo} />
  return <Outlet />
}
