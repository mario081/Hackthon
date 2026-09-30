export const imgUrl = (arasaacId) =>
  `https://static.arasaac.org/pictograms/${arasaacId}/${arasaacId}_300.png`

export const PICTOGRAMS = {
  WHO: [
    { id: 'adult_male',   arasaacId: 26557, label: 'Homem adulto' },
    { id: 'adult_female', arasaacId: 26560, label: 'Mulher adulta' },
    { id: 'family',       arasaacId: 4877,  label: 'Familiar' },
    { id: 'teacher',      arasaacId: 5525,  label: 'Professor/a' },
    { id: 'professional', arasaacId: 5056,  label: 'Profissional' },
    { id: 'colleague',    arasaacId: 4929,  label: 'Colega' },
    { id: 'stranger',     arasaacId: 29523, label: 'Pessoa desconhecida' },
    { id: 'other_who',    arasaacId: 2577,  label: 'Outro' },
  ],
  WHAT: [
    { id: 'hit',        arasaacId: 6047,  label: 'Bateu' },
    { id: 'touch',      arasaacId: 2418,  label: 'Tocou' },
    { id: 'shout',      arasaacId: 29631, label: 'Gritou' },
    { id: 'threaten',   arasaacId: 30128, label: 'Ameaçou' },
    { id: 'hurt',       arasaacId: 17432, label: 'Machucou' },
    { id: 'take',       arasaacId: 5671,  label: 'Tirou algo' },
    { id: 'force',      arasaacId: 6030,  label: 'Obrigou' },
    { id: 'show',       arasaacId: 5748,  label: 'Mostrou algo' },
    { id: 'other_what', arasaacId: 2577,  label: 'Outro' },
  ],
  WHERE: [
    { id: 'home',        arasaacId: 4800, label: 'Casa' },
    { id: 'school',      arasaacId: 5061, label: 'Escola' },
    { id: 'work',        arasaacId: 5591, label: 'Trabalho' },
    { id: 'street',      arasaacId: 6396, label: 'Rua' },
    { id: 'transport',   arasaacId: 6418, label: 'Transporte' },
    { id: 'other_where', arasaacId: 2577, label: 'Outro lugar' },
  ],
  WHEN: [
    { id: 'today',     arasaacId: 6344,  label: 'Hoje' },
    { id: 'yesterday', arasaacId: 6346,  label: 'Ontem' },
    { id: 'last_week', arasaacId: 6350,  label: 'Semana passada' },
    { id: 'long_ago',  arasaacId: 32198, label: 'Há muito tempo' },
    { id: 'dont_know', arasaacId: 6298,  label: 'Não sei' },
  ],
  FEELINGS: [
    { id: 'fear',      arasaacId: 6307,  label: 'Medo' },
    { id: 'sadness',   arasaacId: 6310,  label: 'Tristeza' },
    { id: 'anger',     arasaacId: 6308,  label: 'Raiva' },
    { id: 'pain',      arasaacId: 6313,  label: 'Dor' },
    { id: 'shame',     arasaacId: 6316,  label: 'Vergonha' },
    { id: 'confusion', arasaacId: 32267, label: 'Confusão' },
    { id: 'relief',    arasaacId: 6319,  label: 'Alívio' },
  ],
}

export const STEPS = [
  { key: 'WHO',      question: 'QUEM?',              optional: false },
  { key: 'WHAT',     question: 'O QUE ACONTECEU?',   optional: false },
  { key: 'WHERE',    question: 'ONDE?',               optional: false },
  { key: 'WHEN',     question: 'QUANDO?',             optional: false },
  { key: 'FEELINGS', question: 'COMO VOCÊ SE SENTE?', optional: false },
]
