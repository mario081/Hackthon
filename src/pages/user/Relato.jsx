import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Lock, Pencil, Send } from 'lucide-react'
import { useReports, useSettings } from '../../context/reports'
import { imgUrl, ORIGINS, PICTOGRAMS, resolve, SHORT_QUESTION, STEPS } from '../../data/catalog'
import { isComplete } from '../../lib/reports'
import UserLayout from '../../components/user/UserLayout'
import PictogramCard from '../../components/PictogramCard'

const REVIEW = STEPS.length
const TOTAL = STEPS.length + 1

function Progress({ index }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: TOTAL }, (_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= index ? 'bg-accent' : 'bg-navy-700'}`} />
        ))}
      </div>
      <p className="text-sm font-medium text-slate-400">Passo {index + 1} de {TOTAL}</p>
    </div>
  )
}

export default function Relato() {
  const { draft, toggleSelection, setExtraText, submitDraft } = useReports()
  const { speak } = useSettings()
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [editingFromReview, setEditingFromReview] = useState(false)

  const isReview = index === REVIEW
  const step = STEPS[index]
  const selected = step ? draft.selections[step.key] : []

  useEffect(() => {
    speak(isReview ? 'Revisar seu relato' : step.question)
  }, [index, isReview, step, speak])

  function goNext() {
    if (editingFromReview) {
      setEditingFromReview(false)
      setIndex(REVIEW)
    } else {
      setIndex((i) => i + 1)
    }
    window.scrollTo?.(0, 0)
  }

  function goBack() {
    if (index === 0) navigate('/')
    else setIndex((i) => i - 1)
  }

  function edit(stepIndex) {
    setEditingFromReview(true)
    setIndex(stepIndex)
  }

  function handleToggle(pictogram) {
    if (!selected.includes(pictogram.id)) speak(pictogram.label)
    toggleSelection(step.key, pictogram.id, step.single)
  }

  function handleSubmit() {
    const id = submitDraft()
    navigate(`/enviado/${id}`, { replace: true })
  }

  const footer = isReview ? (
    <div className="flex gap-3">
      <button type="button" onClick={goBack} className="btn-ghost border border-navy-600 text-lg">
        <ArrowLeft size={20} aria-hidden="true" /> Voltar
      </button>
      <button type="button" onClick={handleSubmit} disabled={!isComplete(draft.selections)} className="btn-primary flex-1 text-lg">
        Enviar relato <Send size={20} aria-hidden="true" />
      </button>
    </div>
  ) : (
    <div className="flex gap-3">
      <button type="button" onClick={goBack} className="btn-ghost border border-navy-600 text-lg">
        <ArrowLeft size={20} aria-hidden="true" /> Voltar
      </button>
      <button type="button" onClick={goNext} disabled={selected.length === 0} className="btn-primary flex-1 text-lg">
        {editingFromReview ? 'Voltar à revisão' : 'Avançar'} <ArrowRight size={20} aria-hidden="true" />
      </button>
    </div>
  )

  return (
    <UserLayout title={isReview ? 'Revisar e confirmar' : 'Fazer um relato'} back={goBack} footer={footer} hideNav>
      <div data-testid="page-relato" className="flex flex-col gap-5">
        <Progress index={index} />

        {isReview ? (
          <ReviewStep draft={draft} onEdit={edit} onExtraText={setExtraText} />
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold text-white">{step.question}</h1>
              <p className="mt-1 text-lg text-slate-300">{step.help}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {PICTOGRAMS[step.key].map((p) => (
                <PictogramCard key={p.id} pictogram={p} selected={selected.includes(p.id)} onToggle={handleToggle} />
              ))}
            </div>
          </>
        )}
      </div>
    </UserLayout>
  )
}

function ReviewStep({ draft, onEdit, onExtraText }) {
  const complete = isComplete(draft.selections)
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-white">Revisar seu relato</h1>
        <p className="mt-1 text-lg text-slate-300">Confira suas escolhas antes de enviar.</p>
        {draft.origin !== 'RELATO' && (
          <p className="mt-2 text-sm text-slate-400">Tipo: {ORIGINS[draft.origin]}</p>
        )}
      </div>

      <ul className="card divide-y divide-navy-700">
        {STEPS.map(({ key }, i) => {
          const items = resolve(key, draft.selections[key])
          return (
            <li key={key} className="flex items-center gap-3 p-3">
              <div className="flex -space-x-2">
                {items.slice(0, 3).map((p) => (
                  <span key={p.id} className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-0.5 ring-2 ring-navy-850">
                    <img src={imgUrl(p.arasaacId)} alt="" className="h-full w-full object-contain" />
                  </span>
                ))}
                {items.length === 0 && <span className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-amber-300/60 text-amber-200">?</span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-400">{SHORT_QUESTION[key]}</p>
                <p className="text-lg font-semibold text-white">
                  {items.length ? items.map((p) => p.label).join(', ') : <span className="text-amber-200">Falta responder</span>}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onEdit(i)}
                aria-label={`Editar: ${SHORT_QUESTION[key]}`}
                className="inline-flex min-h-[48px] items-center gap-1 rounded-xl px-3 font-semibold text-accent hover:bg-accent/10"
              >
                <Pencil size={16} aria-hidden="true" /> Editar
              </button>
            </li>
          )
        })}
      </ul>

      <label className="flex flex-col gap-2">
        <span className="text-lg font-semibold text-white">Quer contar mais alguma coisa? <span className="font-normal text-slate-400">(opcional)</span></span>
        <textarea
          value={draft.extraText}
          onChange={(e) => onExtraText(e.target.value)}
          rows={3}
          maxLength={500}
          className="field py-3 text-lg"
          placeholder="Escreva aqui, se quiser"
        />
      </label>

      <div className="flex gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4">
        <Lock className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
        <p className="text-slate-200">
          <strong className="block text-white">Seu relato é sigiloso e protegido.</strong>
          Só profissionais autorizados da rede de proteção vão ver.
        </p>
      </div>

      {!complete && (
        <p role="alert" className="text-lg font-medium text-amber-200">
          Responda todos os passos para poder enviar.
        </p>
      )}
    </>
  )
}
