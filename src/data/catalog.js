// Pictogramas ARASAAC (CC BY-NC-SA, Governo de Aragão) guardados localmente em
// public/pictograms para não expor a terceiros quais imagens a pessoa vê.
export const imgUrl = (arasaacId) => `/pictograms/${arasaacId}.png`

// `phrase` é o trecho usado no resumo assistido; `hint` é a explicação simples no cartão.
export const PICTOGRAMS = {
  ABOUT: [
    { id: 'self',       arasaacId: 6632,  label: 'Eu mesmo(a)',            phrase: 'a própria pessoa' },
    { id: 'other',      arasaacId: 39622, label: 'Outra pessoa',           phrase: 'outra pessoa' },
    { id: 'child',      arasaacId: 2485,  label: 'Criança',                phrase: 'uma criança' },
    { id: 'teen',       arasaacId: 10206, label: 'Adolescente',            phrase: 'um(a) adolescente' },
    { id: 'elderly',    arasaacId: 25796, label: 'Pessoa idosa',           phrase: 'uma pessoa idosa' },
    { id: 'disability', arasaacId: 24513, label: 'Pessoa com deficiência', phrase: 'uma pessoa com deficiência' },
  ],
  WHO: [
    { id: 'man',          arasaacId: 4665,  label: 'Homem',               phrase: 'um homem' },
    { id: 'woman',        arasaacId: 4703,  label: 'Mulher',              phrase: 'uma mulher' },
    { id: 'family',       arasaacId: 2392,  label: 'Alguém da família',   phrase: 'alguém da família' },
    { id: 'teacher',      arasaacId: 6556,  label: 'Professor(a)',        phrase: 'um(a) professor(a)' },
    { id: 'professional', arasaacId: 7795,  label: 'Profissional',        phrase: 'um(a) profissional' },
    { id: 'colleague',    arasaacId: 39421, label: 'Colega',              phrase: 'um(a) colega' },
    { id: 'stranger',     arasaacId: 9853,  label: 'Pessoa desconhecida', phrase: 'uma pessoa desconhecida' },
    { id: 'other_who',    arasaacId: 17054, label: 'Outra pessoa',        phrase: 'outra pessoa' },
  ],
  WHAT: [
    { id: 'physical',       arasaacId: 4714,  label: 'Violência física',      hint: 'Bateu, empurrou ou machucou',   phrase: 'praticado violência física' },
    { id: 'psychological',  arasaacId: 7120,  label: 'Violência psicológica', hint: 'Gritou, xingou ou humilhou',    phrase: 'praticado violência psicológica' },
    { id: 'threat',         arasaacId: 37136, label: 'Ameaça',                hint: 'Disse que ia fazer mal',        phrase: 'feito ameaças' },
    { id: 'sexual',         arasaacId: 30989, label: 'Violência sexual',      hint: 'Tocou meu corpo sem eu querer', phrase: 'praticado violência sexual' },
    { id: 'bullying',       arasaacId: 24717, label: 'Bullying',              hint: 'Zoou ou excluiu sempre',        phrase: 'praticado bullying' },
    { id: 'online',         arasaacId: 38509, label: 'Assédio na internet',   hint: 'Mensagens ou fotos ofensivas',  phrase: 'praticado assédio pela internet' },
    { id: 'discrimination', arasaacId: 12323, label: 'Discriminação',         hint: 'Tratou mal por quem eu sou',    phrase: 'praticado discriminação' },
    { id: 'neglect',        arasaacId: 21328, label: 'Negligência',           hint: 'Deixou sem cuidado ou abandonou', phrase: 'deixado de prestar cuidado' },
    { id: 'other_what',     arasaacId: 17054, label: 'Outra situação',        hint: 'Não está na lista',             phrase: 'causado outra situação' },
  ],
  WHERE: [
    { id: 'home',      arasaacId: 6964,  label: 'Casa',        phrase: 'em casa' },
    { id: 'school',    arasaacId: 3082,  label: 'Escola',      phrase: 'na escola' },
    { id: 'work',      arasaacId: 16087, label: 'Trabalho',    phrase: 'no trabalho' },
    { id: 'street',    arasaacId: 2299,  label: 'Rua',         phrase: 'na rua' },
    { id: 'transport', arasaacId: 2262,  label: 'Transporte',  phrase: 'no transporte' },
    { id: 'internet',  arasaacId: 37366, label: 'Internet',    phrase: 'pela internet' },
    { id: 'other_where', arasaacId: 17054, label: 'Outro lugar', phrase: 'em outro lugar' },
  ],
  WHEN: [
    { id: 'today',     arasaacId: 7131,  label: 'Hoje',             phrase: 'hoje' },
    { id: 'yesterday', arasaacId: 38279, label: 'Ontem',            phrase: 'ontem' },
    { id: 'last_week', arasaacId: 39735, label: 'Semana passada',   phrase: 'na semana passada' },
    { id: 'long_ago',  arasaacId: 39716, label: 'Há muito tempo',   phrase: 'há muito tempo' },
    { id: 'often',     arasaacId: 37029, label: 'Acontece sempre',  phrase: 'de forma repetida' },
    { id: 'dont_know', arasaacId: 7180,  label: 'Não sei',          phrase: 'em momento que a pessoa não soube indicar' },
  ],
  FEELINGS: [
    { id: 'fear',      arasaacId: 10261, label: 'Com medo',     phrase: 'medo' },
    { id: 'sadness',   arasaacId: 35545, label: 'Triste',       phrase: 'tristeza' },
    { id: 'anger',     arasaacId: 35539, label: 'Com raiva',    phrase: 'raiva' },
    { id: 'pain',      arasaacId: 2367,  label: 'Com dor',      phrase: 'dor' },
    { id: 'shame',     arasaacId: 6922,  label: 'Com vergonha', phrase: 'vergonha' },
    { id: 'confusion', arasaacId: 2352,  label: 'Confuso(a)',   phrase: 'confusão' },
    { id: 'anxiety',   arasaacId: 30484, label: 'Ansioso(a)',   phrase: 'ansiedade' },
    { id: 'calm',      arasaacId: 31310, label: 'Mais tranquilo(a)', phrase: 'alívio' },
  ],
}

export const CATEGORIES = ['ABOUT', 'WHO', 'WHAT', 'WHERE', 'WHEN', 'FEELINGS']

export const STEPS = [
  { key: 'ABOUT',    question: 'Sobre quem é o relato?', help: 'Toque em uma opção.',                single: true },
  { key: 'WHO',      question: 'Quem fez isso?',         help: 'Pode escolher mais de uma.' },
  { key: 'WHAT',     question: 'O que aconteceu?',       help: 'Escolha o tipo de situação.' },
  { key: 'WHERE',    question: 'Onde aconteceu?',        help: 'Pode escolher mais de um lugar.' },
  { key: 'WHEN',     question: 'Quando aconteceu?',      help: 'Toque na opção mais próxima.',     single: true },
  { key: 'FEELINGS', question: 'Como você se sente?',    help: 'É importante saber como isso afeta você.' },
]

export const SHORT_QUESTION = {
  ABOUT: 'Sobre quem?',
  WHO: 'Quem fez?',
  WHAT: 'O que aconteceu?',
  WHERE: 'Onde?',
  WHEN: 'Quando?',
  FEELINGS: 'Como se sente?',
}

const BY_ID = Object.fromEntries(
  CATEGORIES.map((cat) => [cat, Object.fromEntries(PICTOGRAMS[cat].map((p) => [p.id, p]))]),
)

export function getPictogram(category, id) {
  return BY_ID[category]?.[id]
}

export function resolve(category, ids = []) {
  return ids.map((id) => getPictogram(category, id)).filter(Boolean)
}

export const STATUSES = {
  NEW:       { label: 'Novo',               tone: 'red' },
  IN_REVIEW: { label: 'Em análise',         tone: 'amber' },
  AWAITING:  { label: 'Aguardando retorno', tone: 'blue' },
  REFERRED:  { label: 'Encaminhado',        tone: 'green' },
  CLOSED:    { label: 'Concluído',          tone: 'slate' },
}

export const PRIORITIES = {
  URGENT: { label: 'Urgente', tone: 'red' },
  MEDIUM: { label: 'Médio',   tone: 'amber' },
  LOW:    { label: 'Baixo',   tone: 'green' },
}

export const ORIGINS = {
  RELATO:     'Relato próprio',
  TERCEIRO:   'Relato sobre outra pessoa',
  DEPOIMENTO: 'Depoimento',
  PERIGO:     'Pedido de ajuda urgente',
}

export const REFERRAL_STATUSES = {
  PENDING:     { label: 'Pendente',      tone: 'amber' },
  IN_PROGRESS: { label: 'Em andamento',  tone: 'blue' },
  DONE:        { label: 'Concluído',     tone: 'green' },
}

export const REFERRAL_DESTINATIONS = [
  'Acompanhamento psicológico — CAPS Infantojuvenil',
  'Assistência social — CREAS',
  'Conselho Tutelar',
  'Delegacia Especializada (DEAM)',
  'Unidade Básica de Saúde',
  'Defensoria Pública',
  'Articulação com a escola',
]

export const PROFESSIONALS = [
  { id: 'admin',   name: 'Administrador', role: 'Coordenação' },
  { id: 'carla',   name: 'Carla Mendes',  role: 'Psicóloga · CRP 06/123456' },
  { id: 'rafael',  name: 'Rafael Souza',  role: 'Assistente social' },
  { id: 'beatriz', name: 'Beatriz Lima',  role: 'Orientadora educacional' },
]

// Usuário que entra no painel pelo login (usuário admin).
export const CURRENT_USER = PROFESSIONALS[0]

export const EMERGENCY_CONTACTS = [
  { number: '190', name: 'Polícia Militar',               desc: 'Perigo agora, violência acontecendo' },
  { number: '180', name: 'Central de Atendimento à Mulher', desc: 'Violência contra a mulher — 24h, gratuito' },
  { number: '100', name: 'Disque Direitos Humanos',       desc: 'Crianças, pessoas idosas e com deficiência' },
  { number: '192', name: 'SAMU',                          desc: 'Ferimento ou emergência de saúde' },
  { number: '188', name: 'CVV',                           desc: 'Apoio emocional — 24h, gratuito' },
]
