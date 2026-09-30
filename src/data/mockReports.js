export const MOCK_REPORTS = [
  {
    id: 'VX-2026-0041',
    receivedAt: '2026-09-30T14:32:00Z',
    status: 'NEW',
    priority: 'URGENT',
    selections: {
      WHO:      [{ id: 'adult_male',  arasaacId: 26557, label: 'Homem adulto' }],
      WHAT:     [{ id: 'hit',         arasaacId: 6047,  label: 'Bateu' }],
      WHERE:    [{ id: 'home',        arasaacId: 4800,  label: 'Casa' }],
      WHEN:     [{ id: 'today',       arasaacId: 6344,  label: 'Hoje' }],
      FEELINGS: [{ id: 'fear',        arasaacId: 6307,  label: 'Medo' }],
    },
    aiSummary:
      'A pessoa atendida indicou, por meio da interface de comunicação assistiva, que um homem adulto teria praticado agressão física em ambiente residencial no dia atual. A pessoa também associou o sentimento de medo ao ocorrido.',
    timeline: [
      { time: '14:32', description: 'Relato enviado pela pessoa atendida' },
      { time: '14:40', description: 'Relato visualizado por profissional autorizado' },
    ],
    referrals: [],
  },
  {
    id: 'VX-2026-0040',
    receivedAt: '2026-09-30T11:15:00Z',
    status: 'IN_ATTENDANCE',
    priority: 'MEDIUM',
    selections: {
      WHO:      [{ id: 'teacher',  arasaacId: 5525,  label: 'Professor/a' }],
      WHAT:     [{ id: 'shout',    arasaacId: 29631, label: 'Gritou' },
                 { id: 'threaten', arasaacId: 30128, label: 'Ameaçou' }],
      WHERE:    [{ id: 'school',   arasaacId: 5061,  label: 'Escola' }],
      WHEN:     [{ id: 'yesterday',arasaacId: 6346,  label: 'Ontem' }],
      FEELINGS: [{ id: 'fear',     arasaacId: 6307,  label: 'Medo' },
                 { id: 'sadness',  arasaacId: 6310,  label: 'Tristeza' }],
    },
    aiSummary:
      'A pessoa atendida indicou que um professor ou professora teria gritado e ameaçado em ambiente escolar no dia anterior. A pessoa associou os sentimentos de medo e tristeza ao ocorrido.',
    timeline: [
      { time: '11:15', description: 'Relato enviado pela pessoa atendida' },
      { time: '11:22', description: 'Relato visualizado por profissional' },
      { time: '11:30', description: 'Caso classificado como prioridade média' },
      { time: '11:45', description: 'Caso atribuído ao setor de Psicologia' },
    ],
    referrals: [{ destination: 'Psicologia', status: 'EM_ANDAMENTO', date: '2026-09-30' }],
  },
  {
    id: 'VX-2026-0039',
    receivedAt: '2026-09-29T16:00:00Z',
    status: 'REFERRED',
    priority: 'URGENT',
    selections: {
      WHO:      [{ id: 'stranger', arasaacId: 29523, label: 'Pessoa desconhecida' }],
      WHAT:     [{ id: 'touch',    arasaacId: 2418,  label: 'Tocou' }],
      WHERE:    [{ id: 'transport',arasaacId: 6418,  label: 'Transporte' }],
      WHEN:     [{ id: 'yesterday',arasaacId: 6346,  label: 'Ontem' }],
      FEELINGS: [{ id: 'shame',   arasaacId: 6316,  label: 'Vergonha' },
                 { id: 'fear',    arasaacId: 6307,  label: 'Medo' }],
    },
    aiSummary:
      'A pessoa atendida indicou que uma pessoa desconhecida teria realizado contato físico não autorizado em transporte público no dia anterior. A pessoa associou os sentimentos de vergonha e medo ao ocorrido.',
    timeline: [
      { time: '16:00', description: 'Relato enviado pela pessoa atendida' },
      { time: '16:10', description: 'Caso classificado como urgente' },
      { time: '16:20', description: 'Encaminhado para Assistência Social' },
      { time: '16:35', description: 'Encaminhado para Conselho Tutelar' },
    ],
    referrals: [
      { destination: 'Assistência Social', status: 'CONCLUIDO',    date: '2026-09-29' },
      { destination: 'Conselho Tutelar',   status: 'EM_ANDAMENTO', date: '2026-09-29' },
    ],
  },
  {
    id: 'VX-2026-0038',
    receivedAt: '2026-09-29T09:45:00Z',
    status: 'UNDER_REVIEW',
    priority: 'LOW',
    selections: {
      WHO:      [{ id: 'colleague', arasaacId: 4929, label: 'Colega' }],
      WHAT:     [{ id: 'take',      arasaacId: 5671, label: 'Tirou algo' }],
      WHERE:    [{ id: 'school',    arasaacId: 5061, label: 'Escola' }],
      WHEN:     [{ id: 'last_week', arasaacId: 6350, label: 'Semana passada' }],
      FEELINGS: [{ id: 'anger',     arasaacId: 6308, label: 'Raiva' }],
    },
    aiSummary:
      'A pessoa atendida indicou que um colega teria tomado algo dela em ambiente escolar na semana anterior. A pessoa associou o sentimento de raiva ao ocorrido.',
    timeline: [
      { time: '09:45', description: 'Relato enviado pela pessoa atendida' },
      { time: '10:00', description: 'Relato em triagem' },
    ],
    referrals: [],
  },
]
