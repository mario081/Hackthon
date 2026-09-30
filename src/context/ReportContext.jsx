import { createContext, useContext, useState } from 'react'
import { MOCK_REPORTS } from '../data/mockReports'

const ReportContext = createContext(null)

const EMPTY_SELECTIONS = { WHO: [], WHAT: [], WHERE: [], WHEN: [], FEELINGS: [] }

export function ReportProvider({ children }) {
  const [selections, setSelections] = useState(EMPTY_SELECTIONS)
  const [reports, setReports] = useState(MOCK_REPORTS)

  function addSelection(category, pictogram) {
    setSelections((prev) => {
      if (prev[category].some((p) => p.id === pictogram.id)) return prev
      return { ...prev, [category]: [...prev[category], pictogram] }
    })
  }

  function removeSelection(category, pictogramId) {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category].filter((p) => p.id !== pictogramId),
    }))
  }

  function clearSelections() {
    setSelections(EMPTY_SELECTIONS)
  }

  function submitReport() {
    const now = new Date().toISOString()
    const id = `VX-${new Date().getFullYear()}-${String(reports.length + 1).padStart(4, '0')}`
    const who   = selections.WHO.map((p) => p.label).join(', ') || 'alguém'
    const what  = selections.WHAT.map((p) => p.label).join(' e ') || 'algo'
    const where = selections.WHERE.map((p) => p.label).join(', ') || 'algum lugar'
    const when  = selections.WHEN.map((p) => p.label).join(', ') || 'em algum momento'
    const feelings = selections.FEELINGS.map((p) => p.label).join(' e ') || 'algo'
    const aiSummary = `A pessoa atendida indicou, por meio da interface de comunicação assistiva, que ${who} teria praticado "${what}" em ${where} (${when}). A pessoa também associou o sentimento de ${feelings} ao ocorrido.`
    setReports((prev) => [{
      id,
      receivedAt: now,
      status: 'NEW',
      priority: 'URGENT',
      selections: { ...selections },
      aiSummary,
      timeline: [{ time: now.slice(11, 16), description: 'Relato enviado pela pessoa atendida' }],
      referrals: [],
    }, ...prev])
    clearSelections()
    return id
  }

  return (
    <ReportContext.Provider value={{ selections, addSelection, removeSelection, clearSelections, submitReport, reports }}>
      {children}
    </ReportContext.Provider>
  )
}

export function useReport() {
  const ctx = useContext(ReportContext)
  if (!ctx) throw new Error('useReport deve ser usado dentro de ReportProvider')
  return ctx
}
