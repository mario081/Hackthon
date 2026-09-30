import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PICTOGRAMS, STEPS } from '../data/pictograms'
import { useReport } from '../context/ReportContext'
import Pictogram from '../components/Pictogram'
import StepProgress from '../components/StepProgress'

export default function Comunicar() {
  const [stepIndex, setStepIndex] = useState(0)
  const { selections, addSelection, removeSelection } = useReport()
  const navigate = useNavigate()

  const step = STEPS[stepIndex]
  const pictograms = PICTOGRAMS[step.key]
  const currentSelections = selections[step.key]
  const canAdvance = step.optional || currentSelections.length > 0
  const isLast = stepIndex === STEPS.length - 1

  function handleToggle(pictogram) {
    const alreadySelected = currentSelections.some((p) => p.id === pictogram.id)
    if (alreadySelected) {
      removeSelection(step.key, pictogram.id)
    } else {
      addSelection(step.key, pictogram)
    }
  }

  function handleNext() {
    if (isLast) {
      navigate('/confirmar')
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  function handleBack() {
    if (stepIndex === 0) {
      navigate('/')
    } else {
      setStepIndex((i) => i - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button onClick={handleBack} className="text-gray-600 font-medium">
          ← Voltar
        </button>
        <StepProgress currentStep={stepIndex + 1} totalSteps={STEPS.length} />
        <div className="w-16" />
      </header>

      <main className="flex-1 flex flex-col items-center p-6 gap-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">{step.question}</h1>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full max-w-2xl">
          {pictograms.map((pic) => (
            <Pictogram
              key={pic.id}
              pictogram={pic}
              selected={currentSelections.some((p) => p.id === pic.id)}
              onToggle={handleToggle}
            />
          ))}
        </div>

        {currentSelections.length > 0 && (
          <div className="flex flex-wrap gap-2 w-full max-w-2xl">
            {currentSelections.map((p) => (
              <span
                key={p.id}
                className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {p.label}
                <button
                  onClick={() => removeSelection(step.key, p.id)}
                  aria-label={`Remover ${p.label}`}
                  className="text-blue-500 hover:text-blue-700 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </main>

      <footer className="p-6">
        <button
          onClick={handleNext}
          disabled={!canAdvance}
          className="w-full py-4 text-xl font-bold rounded-2xl text-white transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
        >
          {isLast ? 'VER RESUMO →' : 'PRÓXIMO →'}
        </button>
      </footer>
    </div>
  )
}
