import { Link } from 'react-router-dom'
import {
  Accessibility, ArrowRight, BookOpenText, Bot, CircleCheck, ClipboardList, EyeOff, FileText, Hand, HeartHandshake,
  LayoutDashboard, ListChecks, Lock, MessageSquareText, Phone, Route, Send, ShieldCheck, Siren, TriangleAlert, Type, UserRound,
  Users, Volume2,
} from 'lucide-react'
import Logo from '../components/Logo'
import { imgUrl } from '../data/catalog'

const NAV = [
  ['#problema', 'O problema'],
  ['#jornada', 'Como funciona'],
  ['#acessibilidade', 'Acessibilidade'],
  ['#instituicoes', 'Para instituições'],
]

const JOURNEY = [
  { q: 'Sobre quem?', pic: 6632, label: 'Eu mesmo(a)' },
  { q: 'Quem fez?', pic: 4665, label: 'Homem' },
  { q: 'O que aconteceu?', pic: 7120, label: 'Violência psicológica' },
  { q: 'Onde?', pic: 3082, label: 'Escola' },
  { q: 'Quando?', pic: 37029, label: 'Acontece sempre' },
  { q: 'Como se sente?', pic: 10261, label: 'Com medo' },
]

const PROBLEMS = [
  { icon: MessageSquareText, title: 'Canais que exigem fala ou escrita', text: 'Telefone, formulário longo ou depoimento oral excluem quem tem autismo não verbal, deficiência intelectual, paralisia cerebral ou afasia.' },
  { icon: Route, title: 'Relatos que se perdem no caminho', text: 'Sem um registro fiel, o que a pessoa quis dizer é reinterpretado por terceiros e pode virar algo que ela não disse.' },
  { icon: ClipboardList, title: 'Instituições sem estrutura para agir', text: 'Quando o relato chega, falta triagem, responsável e histórico. O caso fica parado entre setores.' },
]

const A11Y = [
  { icon: Hand, title: 'Pictogramas de CAA', text: 'Figuras do ARASAAC, padrão internacional de Comunicação Aumentativa e Alternativa.' },
  { icon: ListChecks, title: 'Uma pergunta por vez', text: 'Telas curtas com progresso visível: a pessoa sabe onde está e quanto falta.' },
  { icon: Accessibility, title: 'Toque fácil', text: 'Botões de no mínimo 48 px, letras a partir de 18 px e seleção que não depende só de cor.' },
  { icon: Volume2, title: 'Leitura em voz alta', text: 'O app fala a pergunta e o nome de cada figura tocada.' },
  { icon: Type, title: 'Texto ampliado', text: 'Um toque aumenta letras e botões em todo o app.' },
  { icon: BookOpenText, title: 'Linguagem simples', text: '“Violência física” vem junto de “Bateu, empurrou ou machucou”.' },
]

const SAFETY = [
  { icon: EyeOff, title: 'Sair rapidamente', text: 'Em todas as telas. Apaga o rascunho e abre uma página comum, sem deixar rastro no “voltar”.' },
  { icon: Lock, title: 'Nada salvo no aparelho', text: 'O relato não fica gravado no celular de quem denuncia.' },
  { icon: Siren, title: 'Estou em perigo', text: 'Acesso direto a 190, 180, 100, 192 e 188, e relato urgente no topo da fila.' },
  { icon: CircleCheck, title: 'Acompanhamento', text: 'Número de protocolo para ver o andamento: recebido, em análise, encaminhado, concluído.' },
]

const PANEL = [
  { icon: LayoutDashboard, title: 'Dashboard', text: 'Casos novos, em análise, encaminhados e concluídos em uma visão.' },
  { icon: TriangleAlert, title: 'Triagem com prioridade sugerida', text: 'O sistema sugere; o profissional decide e pode alterar.' },
  { icon: UserRound, title: 'Responsáveis', text: 'Cada caso tem um profissional atribuído.' },
  { icon: Send, title: 'Encaminhamentos', text: 'CAPS, CREAS, Conselho Tutelar, Delegacia, escola, com status de cada um.' },
  { icon: ListChecks, title: 'Linha do tempo', text: 'Toda ação fica registrada com data, hora e autor.' },
  { icon: ShieldCheck, title: 'Acesso restrito', text: 'Painel protegido por login.' },
]

function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section id={id} className="scroll-mt-20 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-lg text-slate-300">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}

function FeatureGrid({ items, cols = 'lg:grid-cols-3' }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${cols}`}>
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title} className="card p-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Icon size={22} aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-slate-300">{text}</p>
        </li>
      ))}
    </ul>
  )
}

function PhoneMock() {
  const tiles = [
    ['Quero denunciar', 'bg-red-600', TriangleAlert],
    ['Estou em perigo', 'bg-orange-700', Siren],
    ['Falar sobre alguém', 'bg-violet-600', Users],
    ['Dar um depoimento', 'bg-blue-600', MessageSquareText],
  ]
  return (
    <div aria-hidden="true" className="relative mx-auto w-[270px] rounded-[2.5rem] border-[6px] border-navy-700 bg-navy-950 p-4 shadow-[0_30px_80px_-20px_rgba(34,211,238,0.35)]">
      <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-navy-700" />
      <Logo size="sm" />
      <p className="mt-4 text-lg font-bold leading-tight text-white">Como você quer se comunicar hoje?</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {tiles.map(([label, color, Icon]) => (
          <div key={label} className={`flex h-24 flex-col items-center justify-center gap-1 rounded-xl ${color} p-2 text-center text-white`}>
            <Icon size={22} />
            <span className="text-xs font-bold leading-tight">{label}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-3 text-xs font-bold text-white">
        <Accessibility size={18} /> Acessibilidade
      </div>
      <div className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-accent/70 text-xs font-bold uppercase tracking-wide text-accent">
        <EyeOff size={16} /> Sair rapidamente
      </div>
    </div>
  )
}

export default function Landing() {
  return (
    <div data-testid="page-landing" className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-navy-700/60 bg-navy-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 sm:px-6">
          <Link to="/" aria-label="Voz Segura — início"><Logo tagline /></Link>
          <nav aria-label="Seções" className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white">
                {label}
              </a>
            ))}
          </nav>
          <Link to="/app" className="btn-primary ml-auto min-h-[44px] whitespace-nowrap px-4 text-sm lg:ml-2">
            Acessar aplicação <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:pb-28 lg:pt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                <HeartHandshake size={16} aria-hidden="true" /> Comunicação acessível e proteção de direitos
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
                E se o canal se adaptasse <span className="text-accent">à pessoa?</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                O Voz Segura permite que pessoas com necessidades complexas de comunicação relatem situações de violência
                usando pictogramas, e entrega à rede de proteção um caso organizado para agir.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/app" className="btn-primary px-6 text-lg">
                  Acessar aplicação <ArrowRight size={20} aria-hidden="true" />
                </Link>
                <Link to="/painel" className="btn-outline px-6 text-lg">
                  <LayoutDashboard size={20} aria-hidden="true" /> Painel institucional
                </Link>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                <Phone size={16} className="text-red-300" aria-hidden="true" />
                Em perigo agora? Ligue <a href="tel:190" className="font-semibold text-white underline-offset-2 hover:underline">190</a>.
              </p>
            </div>
            <PhoneMock />
          </div>
        </section>

        <Section
          id="problema"
          eyebrow="O problema"
          title="Quem não fala com a boca também tem voz, mas os canais de denúncia não foram feitos para ouvir."
        >
          <FeatureGrid items={PROBLEMS} />
        </Section>

        <Section
          id="jornada"
          eyebrow="A jornada da pessoa"
          title="O relato é construído no próprio ritmo, tocando em figuras."
          intro="Uma pergunta por tela. Sem precisar falar ou escrever. Antes de enviar, tudo pode ser revisado e corrigido."
        >
          <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {JOURNEY.map((s, i) => (
              <li key={s.q} className="card flex flex-col items-center p-4 text-center">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Passo {i + 1}</span>
                <span className="mt-1 font-semibold text-white">{s.q}</span>
                <span className="mt-3 flex h-20 w-20 items-center justify-center rounded-xl bg-white p-1.5 ring-2 ring-accent">
                  <img src={imgUrl(s.pic)} alt={s.label} className="h-full w-full object-contain" loading="lazy" />
                </span>
                <span className="mt-2 text-sm text-slate-300">{s.label}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-center text-slate-200">
            <CircleCheck className="text-accent" aria-hidden="true" />
            <span><strong className="text-white">Passo 7 — Revisar e confirmar.</strong> A pessoa confere tudo, edita o que quiser e envia. Recebe um número para acompanhar.</span>
          </div>
        </Section>

        <Section
          id="regras"
          eyebrow="Tecnologia com regras"
          title="A tecnologia apoia. A decisão continua humana."
          intro="Cada escolha fica registrada exatamente como foi feita. A IA organiza essas informações em texto, sem fazer inferências nem classificação jurídica."
        >
          <ol className="grid gap-3 md:grid-cols-4">
            {[
              [Hand, 'Pictogramas', 'A pessoa escolhe as figuras'],
              [FileText, 'Registro original', 'Guardado sem alterações'],
              [Bot, 'IA', 'Organiza as escolhas em texto'],
              [BookOpenText, 'Resumo assistido', 'Rotulado como gerado por IA'],
            ].map(([Icon, title, text], i) => (
              <li key={title} className="card relative flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-navy-950">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-white">{title}</span>
                  <span className="block text-sm text-slate-300">{text}</span>
                </span>
                {i < 3 && <ArrowRight className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-accent md:block" aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['O que a pessoa comunicou', 'Relato original: as figuras escolhidas, sem interpretação.', 'border-accent/50 bg-accent/10'],
              ['O que a IA organizou', 'Resumo assistido, sempre identificado como tal.', 'border-violet-400/50 bg-violet-500/10'],
              ['O que o profissional avaliou', 'Anotações e decisões da equipe, separadas.', 'border-emerald-400/50 bg-emerald-500/10'],
            ].map(([title, text, tone], i) => (
              <div key={title} className={`relative rounded-2xl border-2 p-6 ${tone}`}>
                <p className="text-lg font-bold text-white">{title}</p>
                <p className="mt-1 text-slate-300">{text}</p>
                {i < 2 && (
                  <span className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950 text-xl font-bold text-accent md:flex" aria-label="diferente de">≠</span>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="acessibilidade"
          eyebrow="Acessibilidade"
          title="Pensado para quem mais encontra barreiras."
          intro="Cada detalhe da interface reduz esforço de leitura, de fala e de movimento."
        >
          <FeatureGrid items={A11Y} />
          <h3 className="mt-16 text-2xl font-bold text-white">E para a segurança de quem denuncia</h3>
          <p className="mt-2 max-w-2xl text-slate-300">O agressor pode estar por perto. A interface foi desenhada para essa realidade.</p>
          <div className="mt-6">
            <FeatureGrid items={SAFETY} cols="lg:grid-cols-4" />
          </div>
        </Section>

        <Section
          id="instituicoes"
          eyebrow="Para instituições"
          title="Triagem, responsáveis, linha do tempo e encaminhamentos em um único ambiente."
          intro="O relato não termina no envio. Ele chega a um painel onde profissionais autorizados organizam e acompanham cada caso."
        >
          <FeatureGrid items={PANEL} />
        </Section>

        {/* CTA final */}
        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl border border-accent/40 bg-gradient-to-br from-navy-800 to-navy-900 px-6 py-14 text-center shadow-glow">
            <h2 className="max-w-2xl text-3xl font-bold text-white sm:text-4xl">Veja o Voz Segura funcionando</h2>
            <p className="max-w-xl text-lg text-slate-300">
              Faça um relato de teste com pictogramas e depois acompanhe o caso chegando ao painel institucional.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/app" className="btn-primary px-8 text-lg">
                Acessar aplicação <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link to="/painel" className="btn-outline px-8 text-lg">Painel institucional</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-navy-700/60 px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <Logo size="sm" />
          <p className="text-center">
            Protótipo de hackathon · Pictogramas: Sergio Palao / ARASAAC (CC BY-NC-SA), Governo de Aragão.
          </p>
        </div>
      </footer>
    </div>
  )
}
