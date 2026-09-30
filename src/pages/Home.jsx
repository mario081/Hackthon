import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div
      data-testid="page-home"
      className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 gap-10"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900">VozSegura</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Um espaço seguro para comunicar o que aconteceu.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button
          onClick={() => navigate('/comunicar')}
          className="w-full py-5 text-2xl font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          Quero contar algo
        </button>
        <button
          onClick={() => navigate('/painel')}
          className="w-full py-4 text-lg font-medium rounded-2xl border-2 border-blue-300 text-blue-700 hover:bg-blue-100"
        >
          Sou profissional
        </button>
      </div>
    </div>
  )
}
