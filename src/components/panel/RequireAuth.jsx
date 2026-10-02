import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/reports'

export default function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    return <Navigate to="/painel/login" replace state={{ from: location.pathname + location.search }} />
  }
  return children
}
