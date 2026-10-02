import { Navigate } from 'react-router-dom'
import Inicio from './pages/user/Inicio'
import Relato from './pages/user/Relato'
import Enviado from './pages/user/Enviado'
import Acompanhar from './pages/user/Acompanhar'
import Ajuda from './pages/user/Ajuda'
import Acessibilidade from './pages/user/Acessibilidade'
import Dashboard from './pages/panel/Dashboard'
import Casos from './pages/panel/Casos'
import CasoDetalhe from './pages/panel/CasoDetalhe'
import Encaminhamentos from './pages/panel/Encaminhamentos'
import Login from './pages/panel/Login'
import RequireAuth from './components/panel/RequireAuth'

export const routes = [
  // Frente 1 — pessoa atendida
  { path: '/', element: <Inicio /> },
  { path: '/relato', element: <Relato /> },
  { path: '/enviado/:id', element: <Enviado /> },
  { path: '/acompanhar', element: <Acompanhar /> },
  { path: '/acompanhar/:id', element: <Acompanhar /> },
  { path: '/ajuda', element: <Ajuda /> },
  { path: '/acessibilidade', element: <Acessibilidade /> },
  // Frente 2 — painel institucional (exige login)
  { path: '/painel/login', element: <Login /> },
  { path: '/painel', element: <RequireAuth><Dashboard /></RequireAuth> },
  { path: '/painel/casos', element: <RequireAuth><Casos /></RequireAuth> },
  { path: '/painel/casos/:id', element: <RequireAuth><CasoDetalhe /></RequireAuth> },
  { path: '/painel/encaminhamentos', element: <RequireAuth><Encaminhamentos /></RequireAuth> },
  { path: '*', element: <Navigate to="/" replace /> },
]
