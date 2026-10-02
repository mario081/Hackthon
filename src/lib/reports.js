import { CATEGORIES, getPictogram, resolve, STEPS } from '../data/catalog'

export const EMPTY_SELECTIONS = Object.freeze(
  Object.fromEntries(CATEGORIES.map((c) => [c, []])),
)

export function joinPt(items) {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`
}

const phrases = (selections, cat) => resolve(cat, selections[cat]).map((p) => p.phrase)

// Resumo descritivo: apenas reorganiza as escolhas da pessoa, sem inferir fatos
// nem fazer classificação jurídica (regra de separação das camadas).
export function buildSummary(selections, extraText = '') {
  const who = phrases(selections, 'WHO')
  const verb = who.length > 1 ? 'teriam' : 'teria'
  const parts = [
    `A pessoa indicou, por meio da interface de comunicação assistiva, que o relato é sobre ${joinPt(phrases(selections, 'ABOUT')) || 'pessoa não informada'}.`,
    `Segundo as escolhas feitas, ${joinPt(who) || 'alguém'} ${verb} ${joinPt(phrases(selections, 'WHAT')) || 'causado uma situação não especificada'}, ${joinPt(phrases(selections, 'WHERE')) || 'em local não informado'}, ${joinPt(phrases(selections, 'WHEN')) || 'em momento não informado'}.`,
  ]
  const feelings = phrases(selections, 'FEELINGS')
  if (feelings.length) {
    parts.push(`A pessoa associou ${feelings.length > 1 ? 'os sentimentos de' : 'o sentimento de'} ${joinPt(feelings)} ao ocorrido.`)
  }
  const text = extraText.trim()
  if (text) {
    parts.push(`Também escreveu: “${text}”${/[.!?…]$/.test(text) ? '' : '.'}`)
  }
  return parts.join(' ')
}

const SERIOUS = ['physical', 'sexual', 'threat']
const VULNERABLE = ['child', 'teen', 'elderly', 'disability']

// Prioridade *sugerida* — o profissional pode alterar no painel.
export function suggestPriority(selections, origin) {
  if (origin === 'PERIGO') return 'URGENT'
  const has = (cat, ids) => selections[cat]?.some((id) => ids.includes(id))
  let score = 0
  if (has('WHAT', SERIOUS)) score += 3
  else if (selections.WHAT?.some((id) => id !== 'other_what')) score += 1
  if (has('WHEN', ['today', 'yesterday', 'often'])) score += 1
  if (has('ABOUT', VULNERABLE)) score += 1
  if (has('FEELINGS', ['pain', 'fear'])) score += 1
  if (score >= 4) return 'URGENT'
  if (score >= 2) return 'MEDIUM'
  return 'LOW'
}

export function situationType(selections) {
  const first = selections.WHAT?.[0]
  return first ? getPictogram('WHAT', first).label : 'Não informado'
}

export function isComplete(selections) {
  return STEPS.every(({ key }) => selections[key]?.length > 0)
}

export function nextCaseId(reports, year) {
  const max = reports.reduce((m, r) => Math.max(m, Number(r.id.split('-')[1]) || 0), 0)
  return `${year}-${String(max + 1).padStart(6, '0')}`
}

export function createReport({ selections, extraText, origin, existing, now = new Date() }) {
  const at = now.toISOString()
  return {
    id: nextCaseId(existing, now.getFullYear()),
    createdAt: at,
    origin,
    status: 'NEW',
    priority: suggestPriority(selections, origin),
    assigneeId: null,
    selections: Object.fromEntries(CATEGORIES.map((c) => [c, [...(selections[c] ?? [])]])),
    extraText: extraText.trim(),
    aiSummary: buildSummary(selections, extraText),
    timeline: [{ at, title: 'Relato recebido', description: 'Caso registrado no sistema.' }],
    referrals: [],
    notes: [],
  }
}

export function formatDateTime(iso) {
  const d = new Date(iso)
  const date = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const time = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  return `${date} às ${time}`
}

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
