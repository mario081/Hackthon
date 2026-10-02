import { buildSummary, situationType, suggestPriority } from '../lib/reports'
import { CATEGORIES } from './catalog'

// [sobre, quem, o quê, onde, quando, sentimentos, status, responsável, origem]
const COMBOS = [
  ['teen', ['colleague'], ['psychological', 'online'], ['school', 'internet'], 'often', ['sadness', 'shame'], 'IN_REVIEW', 'carla', 'RELATO'],
  ['child', ['family'], ['physical'], ['home'], 'today', ['fear', 'pain'], 'NEW', null, 'TERCEIRO'],
  ['self', ['colleague'], ['bullying'], ['school'], 'often', ['sadness'], 'IN_REVIEW', 'beatriz', 'RELATO'],
  ['teen', ['stranger'], ['online'], ['internet'], 'last_week', ['fear', 'anxiety'], 'AWAITING', 'rafael', 'RELATO'],
  ['self', ['man'], ['physical', 'threat'], ['home'], 'yesterday', ['fear'], 'IN_REVIEW', 'carla', 'PERIGO'],
  ['disability', ['professional'], ['neglect'], ['other_where'], 'often', ['sadness'], 'AWAITING', 'rafael', 'TERCEIRO'],
  ['self', ['colleague'], ['discrimination'], ['work'], 'last_week', ['anger', 'shame'], 'NEW', null, 'DEPOIMENTO'],
  ['teen', ['teacher'], ['psychological'], ['school'], 'yesterday', ['shame', 'sadness'], 'REFERRED', 'beatriz', 'RELATO'],
  ['self', ['stranger'], ['sexual'], ['transport'], 'yesterday', ['fear', 'shame'], 'REFERRED', 'carla', 'RELATO'],
  ['elderly', ['family'], ['neglect', 'psychological'], ['home'], 'often', ['sadness'], 'IN_REVIEW', 'rafael', 'TERCEIRO'],
  ['self', ['colleague'], ['bullying', 'discrimination'], ['school'], 'often', ['anger', 'sadness'], 'NEW', null, 'RELATO'],
  ['child', ['stranger'], ['other_what'], ['street'], 'dont_know', ['confusion'], 'CLOSED', 'beatriz', 'TERCEIRO'],
  ['self', ['woman'], ['threat'], ['internet'], 'today', ['fear', 'anxiety'], 'NEW', null, 'RELATO'],
  ['teen', ['family'], ['physical'], ['home'], 'last_week', ['pain', 'fear'], 'REFERRED', 'rafael', 'RELATO'],
  ['self', ['professional'], ['psychological'], ['work'], 'often', ['anxiety'], 'CLOSED', 'carla', 'DEPOIMENTO'],
  ['disability', ['colleague'], ['discrimination'], ['school'], 'last_week', ['sadness', 'confusion'], 'AWAITING', 'beatriz', 'TERCEIRO'],
  ['self', ['man'], ['sexual'], ['street'], 'long_ago', ['shame', 'fear'], 'IN_REVIEW', 'carla', 'DEPOIMENTO'],
  ['teen', ['colleague'], ['online'], ['internet'], 'often', ['shame'], 'REFERRED', 'beatriz', 'RELATO'],
  ['child', ['teacher'], ['psychological'], ['school'], 'yesterday', ['fear'], 'CLOSED', 'beatriz', 'TERCEIRO'],
  ['self', ['family'], ['psychological', 'threat'], ['home'], 'often', ['fear', 'sadness'], 'REFERRED', 'rafael', 'RELATO'],
  ['elderly', ['professional'], ['physical'], ['other_where'], 'last_week', ['pain'], 'AWAITING', 'rafael', 'TERCEIRO'],
  ['self', ['stranger'], ['other_what'], ['transport'], 'long_ago', ['calm'], 'CLOSED', 'carla', 'DEPOIMENTO'],
  ['teen', ['colleague', 'teacher'], ['bullying'], ['school'], 'often', ['sadness', 'anger'], 'IN_REVIEW', 'beatriz', 'RELATO'],
  ['self', ['man'], ['physical'], ['home'], 'yesterday', ['pain', 'fear'], 'REFERRED', 'carla', 'RELATO'],
  ['child', ['family'], ['neglect'], ['home'], 'often', ['sadness'], 'REFERRED', 'rafael', 'TERCEIRO'],
  ['self', ['colleague'], ['discrimination'], ['school'], 'yesterday', ['anger'], 'CLOSED', 'beatriz', 'RELATO'],
  ['teen', ['stranger'], ['threat'], ['street'], 'last_week', ['fear'], 'CLOSED', 'carla', 'RELATO'],
  ['self', ['woman'], ['psychological'], ['work'], 'often', ['anxiety', 'sadness'], 'REFERRED', 'carla', 'DEPOIMENTO'],
  ['disability', ['stranger'], ['discrimination'], ['transport'], 'yesterday', ['shame'], 'CLOSED', 'rafael', 'TERCEIRO'],
  ['self', ['colleague'], ['online'], ['internet'], 'last_week', ['confusion'], 'CLOSED', 'beatriz', 'RELATO'],
]

const REFERRAL_BY_TYPE = {
  physical:       'Delegacia Especializada (DEAM)',
  sexual:         'Delegacia Especializada (DEAM)',
  threat:         'Delegacia Especializada (DEAM)',
  neglect:        'Conselho Tutelar',
  psychological:  'Acompanhamento psicológico — CAPS Infantojuvenil',
  bullying:       'Articulação com a escola',
  online:         'Acompanhamento psicológico — CAPS Infantojuvenil',
  discrimination: 'Assistência social — CREAS',
  other_what:     'Assistência social — CREAS',
}

const ASSIGNEE_NAME = { carla: 'Carla Mendes', rafael: 'Rafael Souza', beatriz: 'Beatriz Lima' }
const STATUS_ORDER = ['NEW', 'IN_REVIEW', 'AWAITING', 'REFERRED', 'CLOSED']
const MIN = 60 * 1000

function buildReport(combo, index) {
  const [about, who, what, where, when, feelings, status, assigneeId, origin] = combo
  const selections = { ABOUT: [about], WHO: who, WHAT: what, WHERE: where, WHEN: [when], FEELINGS: feelings }
  CATEGORIES.forEach((c) => { selections[c] ??= [] })

  // Casos mais recentes primeiro, espaçados ~22h a partir de 02/10/2026.
  const created = new Date(Date.UTC(2026, 9, 2, 13, 5) - index * (22 * 60 + 17 * (index % 5)) * MIN)
  const at = (minutes) => new Date(created.getTime() + minutes * MIN).toISOString()
  const level = STATUS_ORDER.indexOf(status)
  const type = situationType(selections)

  const timeline = [{ at: at(0), title: 'Relato recebido', description: 'Caso registrado no sistema.' }]
  const referrals = []
  const notes = []

  if (level >= 1) {
    timeline.push({ at: at(8), title: 'Triagem concluída', description: `Classificado como ${type.toLowerCase()}.` })
    timeline.push({ at: at(190), title: 'Profissional atribuído', description: `Caso encaminhado para ${ASSIGNEE_NAME[assigneeId]}.` })
    timeline.push({ at: at(250), title: 'Em análise', description: 'Início do atendimento e plano de ação.' })
    notes.push({
      id: `n${index}-1`,
      at: at(260),
      author: ASSIGNEE_NAME[assigneeId],
      text: 'Primeiro contato realizado com apoio da interface de comunicação. Pessoa demonstrou compreender as perguntas.',
    })
  }
  if (level >= 2) {
    timeline.push({ at: at(1500), title: 'Aguardando retorno', description: 'Contato com a rede de proteção solicitado.' })
    referrals.push({ id: `r${index}-1`, destination: REFERRAL_BY_TYPE[what[0]], status: level >= 3 ? 'IN_PROGRESS' : 'PENDING', at: at(1500) })
  }
  if (level >= 3) {
    timeline.push({ at: at(2900), title: 'Encaminhado', description: `Encaminhado para ${referrals[0].destination}.` })
    if (selections.WHERE.includes('school')) {
      referrals.push({ id: `r${index}-2`, destination: 'Articulação com a escola', status: 'PENDING', at: at(2900) })
    }
  }
  if (level >= 4) {
    referrals.forEach((r) => { r.status = 'DONE' })
    timeline.push({ at: at(8000), title: 'Concluído', description: 'Atendimento finalizado com acompanhamento da rede.' })
  }

  return {
    id: `2026-${String(1548 - index).padStart(6, '0')}`,
    createdAt: created.toISOString(),
    origin,
    status,
    priority: suggestPriority(selections, origin),
    assigneeId,
    selections,
    extraText: index === 0 ? 'Mandam mensagens no grupo da turma rindo de mim.' : '',
    aiSummary: buildSummary(selections, index === 0 ? 'Mandam mensagens no grupo da turma rindo de mim.' : ''),
    timeline,
    referrals,
    notes,
  }
}

export const MOCK_REPORTS = COMBOS.map(buildReport)
