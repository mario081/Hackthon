import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Comunicar from './pages/Comunicar'
import Confirmar from './pages/Confirmar'
import Enviado from './pages/Enviado'
import Painel from './pages/Painel'
import CasoDetalhe from './pages/CasoDetalhe'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/comunicar', element: <Comunicar /> },
  { path: '/confirmar', element: <Confirmar /> },
  { path: '/enviado', element: <Enviado /> },
  { path: '/painel', element: <Painel /> },
  { path: '/painel/:id', element: <CasoDetalhe /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
