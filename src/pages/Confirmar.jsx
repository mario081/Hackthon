import { useNavigate } from 'react-router-dom'
import { useReport } from '../context/ReportContext'
import { imgUrl, STEPS } from '../data/pictograms'

export default function Confirmar() {
  const { selections, submitReport } = useReport()
  const navigate = useNavigate()

  function handleConfirm() {
    submitReport()
    navigate('/enviado')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">O que você comunicou</h1>
        <p className="text-xs text-gray-400 text-center mt-1">
          Relato original — escolhas realizadas por você
        </p>
      </header>

      <main className="flex-1 p-6 flex flex-col gap-6 max-w-2xl mx-auto w-full">
        {STEPS.map(({ key, question }) => {
          const items = selections[key]
          if (!items || items.length === 0) return null
          return (
            <section key={key}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">{question}</h2>
              <div className="flex flex-wrap gap-4">
                {items.map((pic) => (
                  <div key={pic.id} className="flex flex-col items-center gap-1">
                    <img
                      src={imgUrl(pic.arasaacId)}
                      alt={pic.label}
                      className="w-16 h-16 object-contain"
                    />
                    <span className="text-sm text-gray-700">{pic.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </main>

      <footer className="p-6 flex flex-col gap-3">
        <button
          onClick={handleConfirm}
          className="w-full py-4 text-xl font-bold rounded-2xl text-white bg-green-600 hover:bg-green-700"
        >
          CONFIRMAR
        </button>
        <button
          onClick={() => navigate('/comunicar')}
          className="w-full py-3 text-lg font-medium rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          VOLTAR E ALTERAR
        </button>
      </footer>
    </div>
  )
}
