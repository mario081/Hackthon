import { useReports } from '../context/reports'
import { leave } from './leave'

export const EXIT_URL = 'https://www.google.com.br/search?q=previs%C3%A3o+do+tempo'

// Apaga o rascunho e troca a página atual (sem deixar o app no "voltar" do navegador).
export function useQuickExit() {
  const { clearDraft } = useReports()
  return () => {
    clearDraft()
    leave(EXIT_URL)
  }
}
