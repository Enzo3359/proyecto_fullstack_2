import { Navigate, useLocation } from 'react-router-dom'
import { obtenerSesion } from '../data/usuarios'

function RequireAuth({ children }) {
  const sesion = obtenerSesion()
  const location = useLocation()

  if (!sesion) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

export default RequireAuth
