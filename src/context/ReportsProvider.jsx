import { useCallback, useMemo, useState } from 'react'
import { ReportsContext } from './reports'
import { MOCK_REPORTS } from '../data/mockReports'
import { CURRENT_USER, PROFESSIONALS, PRIORITIES, STATUSES } from '../data/catalog'
import { createReport, EMPTY_SELECTIONS } from '../lib/reports'

const NEW_DRAFT = { selections: EMPTY_SELECTIONS, extraText: '', origin: 'RELATO' }

// Estado apenas em memória: nada do relato fica gravado no aparelho da pessoa.
export function ReportsProvider({ children, initialReports = MOCK_REPORTS }) {
  const [reports, setReports] = useState(initialReports)
  const [draft, setDraft] = useState(NEW_DRAFT)

  const startDraft = useCallback((origin = 'RELATO', about = null) => {
    setDraft({
      ...NEW_DRAFT,
      origin,
      selections: { ...EMPTY_SELECTIONS, ABOUT: about ? [about] : [] },
    })
  }, [])

  const toggleSelection = useCallback((category, id, single = false) => {
    setDraft((d) => {
      const current = d.selections[category]
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : single ? [id] : [...current, id]
      return { ...d, selections: { ...d.selections, [category]: next } }
    })
  }, [])

  const setExtraText = useCallback((extraText) => setDraft((d) => ({ ...d, extraText })), [])
  const clearDraft = useCallback(() => setDraft(NEW_DRAFT), [])

  function submitDraft() {
    const report = createReport({ ...draft, existing: reports })
    setReports((prev) => [report, ...prev])
    setDraft(NEW_DRAFT)
    return report.id
  }

  // Aplica uma alteração ao caso e regista o evento na linha do tempo.
  const patch = useCallback((id, change, event) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        const updated = { ...r, ...change(r) }
        if (event) {
          updated.timeline = [...updated.timeline, { at: new Date().toISOString(), ...event }]
        }
        return updated
      }),
    )
  }, [])

  const actions = useMemo(() => ({
    updateStatus: (id, status) =>
      patch(id, () => ({ status }), {
        title: STATUSES[status].label,
        description: `Status alterado por ${CURRENT_USER.name}.`,
      }),
    startAttendance: (id) =>
      patch(id, (r) => ({ status: 'IN_REVIEW', assigneeId: r.assigneeId ?? CURRENT_USER.id }), {
        title: 'Em análise',
        description: `Atendimento iniciado por ${CURRENT_USER.name}.`,
      }),
    setPriority: (id, priority) =>
      patch(id, () => ({ priority }), {
        title: 'Prioridade alterada',
        description: `Definida como ${PRIORITIES[priority].label.toLowerCase()} por ${CURRENT_USER.name}.`,
      }),
    assign: (id, assigneeId) => {
      const prof = PROFESSIONALS.find((p) => p.id === assigneeId)
      patch(id, () => ({ assigneeId }), {
        title: 'Profissional atribuído',
        description: prof ? `Caso encaminhado para ${prof.name}.` : 'Responsável removido.',
      })
    },
    addReferral: (id, destination) =>
      patch(
        id,
        (r) => ({
          status: r.status === 'CLOSED' ? r.status : 'REFERRED',
          referrals: [
            ...r.referrals,
            { id: `r${Date.now()}`, destination, status: 'PENDING', at: new Date().toISOString() },
          ],
        }),
        { title: 'Encaminhado', description: `Encaminhado para ${destination}.` },
      ),
    updateReferral: (id, referralId, status) =>
      patch(id, (r) => ({
        referrals: r.referrals.map((ref) => (ref.id === referralId ? { ...ref, status } : ref)),
      })),
    addNote: (id, text) =>
      patch(id, (r) => ({
        notes: [
          ...r.notes,
          { id: `n${Date.now()}`, at: new Date().toISOString(), author: CURRENT_USER.name, text },
        ],
      })),
  }), [patch])

  const value = {
    reports,
    getReport: (id) => reports.find((r) => r.id === id),
    draft,
    startDraft,
    toggleSelection,
    setExtraText,
    clearDraft,
    submitDraft,
    ...actions,
  }

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
}
