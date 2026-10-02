import { Type, Volume2 } from 'lucide-react'
import { useSettings } from '../../context/reports'
import UserLayout from '../../components/user/UserLayout'

function Toggle({ icon: Icon, title, desc, checked, onChange, disabled }) {
  return (
    <label className={`card flex min-h-[80px] items-center gap-4 p-4 ${disabled ? 'opacity-50' : 'cursor-pointer'}`}>
      <Icon size={28} className="shrink-0 text-accent" aria-hidden="true" />
      <span className="flex-1">
        <span className="block text-lg font-semibold text-white">{title}</span>
        <span className="block text-sm text-slate-300">{desc}</span>
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="relative h-8 w-14 shrink-0 rounded-full bg-navy-600 transition after:absolute after:left-1 after:top-1 after:h-6 after:w-6 after:rounded-full after:bg-white after:transition peer-checked:bg-accent peer-checked:after:translate-x-6 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-accent"
      />
    </label>
  )
}

export default function Acessibilidade() {
  const { largeText, setLargeText, readAloud, setReadAloud, canSpeak } = useSettings()
  return (
    <UserLayout title="Acessibilidade" back="/app">
      <div data-testid="page-acessibilidade" className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white">Ajuste do seu jeito</h1>
        <Toggle icon={Type} title="Texto maior" desc="Aumenta letras e botões em todo o app" checked={largeText} onChange={setLargeText} />
        <Toggle
          icon={Volume2}
          title="Ler em voz alta"
          desc={canSpeak ? 'Fala as perguntas e o nome de cada figura que você tocar' : 'Este aparelho não tem leitura em voz alta'}
          checked={readAloud}
          onChange={setReadAloud}
          disabled={!canSpeak}
        />
        <p className="text-slate-300">
          As figuras usadas para comunicar são pictogramas do ARASAAC, feitos para comunicação aumentativa e alternativa.
        </p>
      </div>
    </UserLayout>
  )
}
