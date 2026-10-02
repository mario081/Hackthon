import {
  joinPt,
  buildSummary,
  suggestPriority,
  nextCaseId,
  createReport,
  situationType,
  isComplete,
} from './reports'

const base = {
  ABOUT: ['teen'],
  WHO: ['colleague'],
  WHAT: ['psychological'],
  WHERE: ['school'],
  WHEN: ['often'],
  FEELINGS: ['sadness'],
}

test('joinPt junta listas em português', () => {
  expect(joinPt([])).toBe('')
  expect(joinPt(['a'])).toBe('a')
  expect(joinPt(['a', 'b'])).toBe('a e b')
  expect(joinPt(['a', 'b', 'c'])).toBe('a, b e c')
})

test('buildSummary descreve as escolhas sem inferências', () => {
  const text = buildSummary({ ...base, WHO: ['colleague', 'teacher'], FEELINGS: ['sadness', 'fear'] })
  expect(text).toContain('um(a) adolescente')
  expect(text).toContain('um(a) colega e um(a) professor(a) teriam praticado violência psicológica')
  expect(text).toContain('na escola')
  expect(text).toContain('de forma repetida')
  expect(text).toContain('tristeza e medo')
})

test('buildSummary usa singular com um autor e inclui texto livre', () => {
  const text = buildSummary(base, 'Ele manda mensagens à noite')
  expect(text).toContain('um(a) colega teria praticado')
  expect(text).toContain('“Ele manda mensagens à noite”')
})

test('suggestPriority classifica pela gravidade e recência', () => {
  expect(suggestPriority({ ...base, WHAT: ['physical'], WHEN: ['today'], FEELINGS: ['fear'] })).toBe('URGENT')
  expect(suggestPriority({ ...base, WHAT: ['psychological'], WHEN: ['often'], ABOUT: ['self'] })).toBe('MEDIUM')
  expect(suggestPriority({ ...base, ABOUT: ['self'], WHAT: ['other_what'], WHEN: ['long_ago'], FEELINGS: ['calm'] })).toBe('LOW')
})

test('pedido de ajuda urgente é sempre urgente', () => {
  expect(suggestPriority({ ...base, WHAT: ['other_what'], WHEN: ['long_ago'] }, 'PERIGO')).toBe('URGENT')
})

test('nextCaseId continua a partir do maior número existente', () => {
  expect(nextCaseId([{ id: '2026-000148' }, { id: '2026-000150' }], 2026)).toBe('2026-000151')
  expect(nextCaseId([], 2026)).toBe('2026-000001')
})

test('situationType usa o primeiro tipo escolhido', () => {
  expect(situationType({ WHAT: ['sexual', 'threat'] })).toBe('Violência sexual')
  expect(situationType({ WHAT: [] })).toBe('Não informado')
})

test('isComplete exige todos os passos', () => {
  expect(isComplete(base)).toBe(true)
  expect(isComplete({ ...base, WHERE: [] })).toBe(false)
})

test('createReport monta um caso novo com timeline', () => {
  const now = new Date('2026-10-02T13:00:00Z')
  const r = createReport({ selections: base, extraText: '', origin: 'RELATO', existing: [], now })
  expect(r.id).toBe('2026-000001')
  expect(r.status).toBe('NEW')
  expect(r.createdAt).toBe(now.toISOString())
  expect(r.timeline).toHaveLength(1)
  expect(r.timeline[0].title).toBe('Relato recebido')
  expect(r.referrals).toEqual([])
  expect(r.notes).toEqual([])
})
